import AuthProvider from '@/providers/AuthProvider';
import { ReduxStore } from '@/providers/ReduxStore';
import '@/styles/global.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<ReduxStore>
				<Component {...pageProps}/>
			</ReduxStore>
		</AuthProvider>
	);
}
