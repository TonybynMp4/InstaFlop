import app from '../../../app';
import serverless from 'serverless-http';

export async function handler(event, context) {
    return serverless(app)(event, context);
}