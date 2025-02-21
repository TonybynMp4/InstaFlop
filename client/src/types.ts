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