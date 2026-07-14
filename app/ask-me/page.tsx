import type { Metadata } from 'next';
import AskMeChatbot from './ask-me-chatbot';

export const metadata: Metadata = {
    title: 'Ask Me',
    description:
        'Chat with Pushpal Das — ask about my work, experience, or anything else.',
};

export default function AskMePage() {
    return <AskMeChatbot />;
}
