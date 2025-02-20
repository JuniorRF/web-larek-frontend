import { cloneTemplate } from "../../utils/utils";
import { Modal } from "./modal";

export class ContactsModal extends Modal {
    protected buttonSubmit: HTMLButtonElement;
    protected formOrder: HTMLFormElement;

    show(template: HTMLTemplateElement): void {
        const content = cloneTemplate(template);
        this.setContent(content);
        
    }
}


