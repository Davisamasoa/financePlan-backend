import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function checkToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ success: false, message: "Acesso negado!" });
	}

	try {
		const secret: any = process.env.SECRET;
		jwt.verify(token, secret);
		next();
	} catch (error) {
		res.status(400).json({ success: false, message: "Token inválido!" });
	}
}
