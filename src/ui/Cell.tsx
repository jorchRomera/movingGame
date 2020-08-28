import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const CellElement = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px black solid;
`;

export default function Cell(props: PropsWithChildren<CellProps>) {
    const { type } = props;

    function backgroundColor() {
        switch (type) {
            case 0 :
                return style.starter;
            case 1 :
                return style.normal;
            case 2 :
                return style.blocked;
            case 3 :
                return style.ending;
            default :
                return style.normal;
        }
    }

    return <CellElement style={{ backgroundColor: backgroundColor() }}>{props.children}</CellElement>
}

const style = {
    starter: '#f2cc8f',
    ending: '#81b29a',
    blocked: '#8d99ae',
    normal: '#f4f1de',
};

interface CellProps {
    row: number;
    column: number;
    type: number;
}
