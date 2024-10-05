import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await ConnectDB();
}
LoadDB();
export async function POST(request) {
    const formData = await request.formData();
    const email = `${formData.get("email")}`;

    try {
        // Veritabanında aynı email varsa kontrol et
        const existingEmail = await EmailModel.findOne({ email });

        if (existingEmail) {
            // Eğer email zaten varsa, hata mesajı dön
            return NextResponse.json({ success: false, msg: "Bu e-posta zaten abone." });
        }

        // E-posta kayıtlı değilse kaydet
        await EmailModel.create({ email });

        return NextResponse.json({ success: true, msg: "Email başarıyla abone oldu." });
    } catch (error) {
        // Herhangi bir hata durumunda genel bir hata mesajı dön
        return NextResponse.json({ success: false, msg: "Bir hata oluştu!" });
    }
}
export async function GET(request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({emails});
}
export async function DELETE(request) {

    const emailId = request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(emailId);
    return NextResponse.json({ success:true,msg:"Email Deleted" });

}