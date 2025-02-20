import { IUserData, paymentMethod } from "../../types";

export class UserModel<IUserData> {
    payment: paymentMethod;
    address: string;
    email: string;
    telephone: string;

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
        this.telephone = telephone;
    }
}
