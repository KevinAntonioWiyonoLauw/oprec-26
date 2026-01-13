import { Request, Response } from "express";
import { generateTokens, verifyToken, setCookies, clearAuthCookies } from "../utils/jwt";
import { COOKIE_CONFIG, JWT_CONFIG, CLEAR_COOKIE_CONFIG } from "../config/jwtcookies";
import User from '../models/userModels';
import { IGetRequestWithUser } from "../types/getUserRequest";
import { IWawancara } from "../types/IWawancara";
import { randomBytes } from "crypto";
import { resetEmail } from "../utils/resetEmail";
import Divisi from "../models/divisiModels";
import Mahasiswa from "../models/mahasiswaModels";
import { IPenugasan } from "../types/IPenugasan";
import { IUser } from "../types/IUser";
import { isAdminNim } from "../utils/adminNim";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username, password, NIM } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] }).lean();
    if (existingUser) {
      res.status(400).json({ message: "User exists" });
      return;
    }

    const validNIM = await Mahasiswa.findOne({ NIM }).lean();

    if (!validNIM && !isAdminNim(NIM)) {
      res
        .status(400)
        .json({ message: "KAMU BUKAN MAHASISWA ILMU KOMPUTER AKT 24 ATAU 25" });
      return;
    }

    const isAdmin = isAdminNim(NIM);

    const userData = { email, username, password, NIM, isAdmin };
    const user = await User.create(userData);

    const tokens = generateTokens({
      userId: user.id,
      username: user.username,
      NIM: user.NIM,
      isAdmin: user.isAdmin,
      enrolledSlugHima: user.enrolledSlugHima,
      enrolledSlugOti: user.enrolledSlugOti,
    });
    user.accessToken = tokens.accessToken;
    user.refreshToken = tokens.refreshToken;
    await user.save();
    setCookies(res, tokens, COOKIE_CONFIG);

    const { password: _pwd, accessToken: _at, refreshToken: _rt, ...userResponse } =
      user.toObject();

    res.status(201).json({
      message: "User created",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userResponse,
    });
    return;
  } catch (err) {
    res.status(500).json({ message: "Registration error" });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user){  
            res.status(401).json({message: "Invalid credentials"}) 
            return;
        }
        const isValidPassword = await user.comparePassword(password);
        if(!isValidPassword){
            res.status(401).json({message: "Invalid credentials"})
            return;
        };
        const tokens = generateTokens({
            userId: user.id,
            username: user.username,
            NIM: user.NIM,
            isAdmin: user.isAdmin,
            enrolledSlugHima: user.enrolledSlugHima,
            enrolledSlugOti: user.enrolledSlugOti
        })
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await user.save();
        setCookies(res, tokens, COOKIE_CONFIG);

        const { password: _, accessToken: __, refreshToken: ___, ...userResponse } = user.toObject();

         res.status(201).json({
            message: "Login successful",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: userResponse
        })
        return;
    } catch (err) {
         res.status(500).json({message: "Auth error"});
         return;
    }
}

export const refresh = async (req: Request, res: Response): Promise<void> => {
    try{
        const refreshToken = req.cookies['refreshToken'];
        if(!refreshToken) {
            res.status(401).json({message: "No refresh token"})
            return;
        };
        const user = await User.findOne({refreshToken});
        if(!user){
            res.status(401).json({message: "Invalid refresh token"})
            return;
        }
        
        verifyToken(refreshToken, JWT_CONFIG.REFRESH_TOKEN_SECRET);
        
        const tokens = generateTokens({
            userId: user.id, 
            username: user.username,
            NIM: user.NIM,
            isAdmin: user.isAdmin,  
            enrolledSlugHima: user.enrolledSlugHima,
            enrolledSlugOti: user.enrolledSlugOti
        })
        
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken
        await user.save();
        setCookies(res, tokens, COOKIE_CONFIG);
        
        res.status(200).json({
            message: "Token refreshed",
            user: {
                userId: user.id, 
                username: user.username,
                NIM: user.NIM,
                isAdmin: user.isAdmin,
                enrolledSlugHima: user.enrolledSlugHima,
                enrolledSlugOti: user.enrolledSlugOti
            }
        });
        return;
    } catch (err) {
         res.status(401).json({message: "Auth error"});
         return;
    }
}

export const logout = async(req: Request, res: Response): Promise<void> => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    res.clearCookie("accessToken", CLEAR_COOKIE_CONFIG);
    res.clearCookie("refreshToken", CLEAR_COOKIE_CONFIG);

    if (accessToken || refreshToken) {
      await User.updateOne(
        { $or: [{ accessToken }, { refreshToken }] },
        { $unset: { accessToken: "", refreshToken: "" } }
      );
    }

    res.status(200).json({ 
      message: "Logged out successfully"
    });
    return;
  } catch (error) {
    console.error("Logout error:", error);

    res.clearCookie("accessToken", CLEAR_COOKIE_CONFIG);
    res.clearCookie("refreshToken", CLEAR_COOKIE_CONFIG);

    res.status(200).json({ 
      message: "Logged out"
    });
    return;
  }
};


export const getWawancara = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        if(!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        const userId = req.user?.userId;

        const user = await User.findById(userId)
            .populate<{ tanggalPilihanOti: IWawancara }>("tanggalPilihanOti.tanggalId")
            .populate<{ tanggalPilihanHima: IWawancara }>("tanggalPilihanHima.tanggalId");

        if (!user) {
            res.status(404).json({ message: "User gaada" });
            return;
        }
        // Filter `sesi` array in `tanggalPilihanOti` and `tanggalPilihanHima` based on `userId`
        const filteredOti = user.tanggalPilihanOti?.tanggalId ? {
            tanggal: (user.tanggalPilihanOti.tanggalId as unknown as IWawancara).tanggal,
            sesi: (user.tanggalPilihanOti.tanggalId as unknown as IWawancara).sesi.filter(sesi => sesi.dipilihOleh.includes(userId))
        } : null;

        const filteredHima = user.tanggalPilihanHima?.tanggalId ? {
            tanggal: (user.tanggalPilihanHima.tanggalId as unknown as IWawancara).tanggal,
            sesi: (user.tanggalPilihanHima.tanggalId as unknown as IWawancara).sesi.filter(sesi => sesi.dipilihOleh.includes(userId))
            
        } : null;

        res.status(200).json({filteredOti, filteredHima });
        return;
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};


export const getDivisi = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const user = await User.findById(userId)
            .populate("divisiPilihan.divisiId");
        if(!user) {
            res.status(404).json({message: "User gaada"});
            return;
        }
        const sortedUser = user.divisiPilihan?.sort((a, b) => {
            return a.urutanPrioritas - b.urutanPrioritas;
        })
        res.status(200).json({divisiPilihan: sortedUser});
        return;        
    } catch (err) {
        res.status(500).json({message: "Internal Server Error"});
        return;
    }
}

export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(200).json({ 
                message: "If an account with that email exists, a password reset link has been sent." 
            });
            return;
        }

        const resetToken = randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000); 

        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpires.toISOString();
        await user.save();
        const resetUrl = `${process.env.FRONTEND_COMPLETE_URL}/forgot-password/${resetToken}`;

        try {
            await resetEmail(user.email, resetUrl);
        } catch (emailError) {
            console.error("Email sending error:", emailError);

            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;
            await user.save();

            res.status(500).json({ 
                message: "Failed to send password reset email. Please try again later." 
            });
            return;
        }

        res.status(200).json({ 
            message: "Password reset email sent successfully. Please check your inbox." 
        });
        return;

    } catch (error) {
        console.error("requestPasswordReset error:", error);
        res.status(500).json({ 
            message: "An error occurred while processing your request. Please try again later." 
        });
        return;
    }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (!user) {
            res.status(400).json({ message: 'Invalid or expired token' });
            return;
        }
        
        clearAuthCookies(res);
        
        user.accessToken = undefined;
        user.refreshToken = undefined;
        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been updated.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password' });
        return;
    }
};

export const validate = async (req: IGetRequestWithUser, res: Response) => {
    try{
        if(!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        res.status(200).json({message: "Authorized", user: req.user, isAuthenticated: true});
        return;
    } catch (err) {
        res.status(401).json({message: "Internal server error"});
        return; 
    }
}

export const getAllUsersAndTheirFilteredTugas = async (req: IGetRequestWithUser, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    if (!req.user.isAdmin) {
        res.status(403).json({ message: "Access Denied: Not an admin" });
        return;
    }

    try {
        if(req.user.username === "MAKOMTI"){
            const users = await User.find({}).populate("divisiPilihan.divisiId").populate("diterimaDi").populate("tanggalPilihanOti.tanggalId").populate("tanggalPilihanHima.tanggalId");
            res.status(200).json(users);
            return;
        }
        // Find the division associated with the admin's username
        const adminDivision = await Divisi.findOne({ slug: req.user.username });
        if (!adminDivision) {
            res.status(404).json({ message: "Admin's division not found" });
            return;
        }
        // Use the division's `_id` to find users who have chosen this division
        const users = await User.find({
            'divisiPilihan.divisiId': adminDivision.id,
        }).populate<{ tugas: IPenugasan[] }>("tugas").populate("divisiPilihan.divisiId").populate("diterimaDi").populate("tanggalPilihanOti.tanggalId").populate("tanggalPilihanHima.tanggalId");
        // Filter each user's tugas based on `disubmitDi` matching `adminDivision._id`
        const usersWithFilteredTugas = users.map((user: IUser) => {
            // Set `filteredTugas` to an empty array if `user.tugas` is null or undefined
            const filteredTugas = user.tugas?.filter((tugas: IPenugasan) =>
                tugas.disubmitDi.toString() === adminDivision.id.toString()
            ) || [];
            
            return {
                ...user.toObject(),
                adminDivision: adminDivision,
                tugas: filteredTugas, // Replace tugas with the filtered results or an empty array
            };
        });
        res.status(200).json(usersWithFilteredTugas);
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

export const updateUserDivisionAcceptance = async (req: IGetRequestWithUser, res: Response): Promise<void> => {
    const { userId, acceptDivisionId } = req.body; // Expecting userId and acceptance status in the request body
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    if (!req.user.isAdmin) {
        res.status(403).json({ message: "Access Denied: Not an admin" });
        return;
    }
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if(user.diterimaDi) {
            res.status(400).json({message: "User sudah diterima di divisi lain"});
            return;
        }
        // Update the user's acceptance status for their division
        user.diterimaDi = acceptDivisionId;

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: "User division acceptance updated successfully", user });
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

export const getUserDiterimaDimana = async (req: IGetRequestWithUser, res: Response): Promise<void> => {
    if(!req.user) {
        res.status(401).json({message: "Unauthorized"});
        return;
    }
    const currentDate = new Date();
    const releaseDate = new Date(Date.UTC(2026, 0, 29, 17, 0, 0)); // 30 January 2026, 00:00 WIB (UTC+7)
    try {
        const user = await User.findById(req.user.userId).populate("diterimaDi");
        if(!user) {
            res.status(404).json({message: "User not found"});
            return;
        }
        // Allow admin to access anytime
        if((currentDate < releaseDate) && !user.isAdmin) {
            res.status(403).json({message: "Forbidden: Pengumuman belum dibuka"});
            return;
        }
        const diterimaDi = user.diterimaDi;
        res.status(200).json({diterimaDi});
        return;
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const getMe = async (req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const userId = req.user.userId;
        
        const user = await User.findById(userId)
            .populate({
                path: "divisiPilihan.divisiId",
                select: "judul slug himakom" 
            })
            .lean();

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const userResponse = {
            _id: user._id,
            email: user.email,
            username: user.username,
            NIM: user.NIM,
            isAdmin: user.isAdmin,
            enrolledSlugOti: user.enrolledSlugOti,
            enrolledSlugHima: user.enrolledSlugHima,
            prioritasOti: user.prioritasOti,
            prioritasHima: user.prioritasHima,
            divisiPilihan: user.divisiPilihan?.map((dp: any) => ({
                divisiId: {
                    _id: dp.divisiId._id,
                    judul: dp.divisiId.judul,
                    slug: dp.divisiId.slug,
                    himakom: dp.divisiId.himakom
                },
                urutanPrioritas: dp.urutanPrioritas,
                _id: dp._id
            })) || [],
            tanggalPilihanOti: user.tanggalPilihanOti,
            tanggalPilihanHima: user.tanggalPilihanHima,
            __v: user.__v
        };

        res.status(200).json({
            message: "User data retrieved successfully",
            user: userResponse
        });
        return;

    } catch (error) {
        console.error("Error in getMe:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};