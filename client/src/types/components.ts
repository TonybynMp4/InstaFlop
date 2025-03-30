import type { Comment } from "./types";

interface FormComponentProps {
	formLegend: string;
	fields: FieldComponentProps[];
	actions: ButtonComponentProps[];
	onSubmit: (event: Event) => void;
}

type FieldComponentProps = {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	minLength?: number;
	required?: boolean;
	defaultValue?: string;
};

type ButtonComponentProps = {
	id: string;
	label: string;
	type?: 'submit' | 'reset' | 'button';
	className?: string;
	style?: string;
	disabled?: boolean;
	onClick?: (event: Event) => void;
};

interface UsernameComponentProps {
	username: string;
}

interface PostComponentProps {
	id: number;
	content: string;
	image: string;
	liked: boolean;
	username: string;
	likes: number;
	createdAt: string;
	comments: Comment[];
}

type CommentComponentProps = {
	comment: Comment;
}

export type {
	FormComponentProps,
	FieldComponentProps,
	ButtonComponentProps,
	CommentComponentProps,
	UsernameComponentProps,
	PostComponentProps
}