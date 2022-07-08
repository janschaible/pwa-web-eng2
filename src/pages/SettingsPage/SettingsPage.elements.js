import styled from 'styled-components'

import { Link,List } from 'framework7-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Container = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: max(50%,500px);
`

export const BackButton = styled(Link)`
    align-self:flex-start;
    height: 3.5rem;
    width: 3.5rem;
    font-size: 2rem;
    border-radius: 50%;
    border-style: none;
    background-color: #EEE;
    box-shadow: 2px 2px 1px black;
    margin: calc(var(--f7-card-margin-horizontal) + var(--f7-safe-area-right));
    cursor: pointer;
`

export const Anon = styled(FontAwesomeIcon)`
    height: 5rem;
    width: 5rem;
    padding: 2rem;
    background-color: #EEE;
    border-radius: 50%;
`

export const ItemList = styled(List)`
    align-self: stretch;
`