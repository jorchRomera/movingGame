import React from 'react';

export abstract class Presentable<TPresenter, TProps = {}, TState = {}> extends React.Component<TProps, TState> {
    protected presenter: TPresenter;
    protected history: any;

    constructor(props: Readonly<TProps> & { createPresenter: any; history: any }) {
        super(props);
        this.presenter = props.createPresenter(this);
        this.history = props.history;
    }

    componentWillUnmount(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        if (this.presenter.dispose) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.presenter.dispose();
        }
    }
}
