interface FormComponent {
    formLegend: string;
    fields: FieldComponent[];
    actions: ButtonComponent[];
    onSubmit: (event: Event) => void;
}

type FieldComponent = {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
    minLength?: number;
    required?: boolean;
	defaultValue?: string;
};

type ButtonComponent = {
    id: string;
    label: string;
    type?: 'submit' | 'reset' | 'button';
    className?: string;
    style?: string;
    disabled?: boolean;
    onClick?: (event: Event) => void;
};

interface User {
	id: number; //TODO: UUID?
    username: string;
    email: string;
    role: string;
}

export type {
    FormComponent,
    FieldComponent,
    ButtonComponent,
    User
}