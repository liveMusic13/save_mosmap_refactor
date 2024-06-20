'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

export function ReduxStore({ children }: PropsWithChildren) {
	return <Provider store={store}>{children}</Provider>
}
