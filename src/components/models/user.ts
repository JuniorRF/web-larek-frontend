import { IUserDataClass, paymentMethod } from "../../types";

export class UserModel implements IUserDataClass {
    payment: paymentMethod;
    address: string;
    email: string;
    phone: string;

    setPayment(payment: paymentMethod): void {
        this.payment = payment;
    }

    setAddress(address: string): void {
        this.address = address;
        }   

    setEmail(email: string): void {
        this.email = email;
    }

    setTelephone(telephone: string): void {
        const cleaned = telephone.replace(/\D/g, '');
        if (cleaned[0] === '7' && cleaned.length === 11) {
            this.phone = `+${cleaned}`;
        } else if (cleaned[0] !== '7' && cleaned.length === 11) {
            this.phone = `'7' + ${cleaned.slice(1)}`;
        }
    }

}
