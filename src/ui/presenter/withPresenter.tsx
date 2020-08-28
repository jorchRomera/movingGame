import React from 'react';

export function withPresenter(Component: any, createPresenter: any) {
    return (props: any) => <Component {...props} createPresenter={createPresenter} />;
}