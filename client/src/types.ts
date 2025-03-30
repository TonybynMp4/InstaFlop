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

interface UsernameComponent {
	username: string;
}

interface User {
	id: number;
    username: string;
    email: string;
    role: string;
	profilePicture: string;
}

interface PostComponent {
	id: number;
	content: string;
	image: string;
	liked: boolean;
	username: string;
	likes: number;
	createdAt: string;
	comments: Comment[];
}

interface Comment {
	id: number;
	username: string;
	profilePicture: string;
	content: string;
	createdAt: string;
}

type CommentComponent = {
	comment: Comment;
}

export type {
    FormComponent,
    FieldComponent,
    ButtonComponent,
    User,
	CommentComponent,
	UsernameComponent,
	PostComponent,
	Comment
}