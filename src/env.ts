import { config } from 'dotenv';

export const fetchEnv = (): string => {
    config();
    const { OPENAI_API_KEY } = process.env

    if (OPENAI_API_KEY == null) {
        throw new Error('Missing required env var: OPENAI_API_KEY')
    }

    return  OPENAI_API_KEY
}
