import styled from 'styled-components';

export const FormFeedback = styled.div`
    font-size: 14px;
    color: ${props => props.invalid ? "red" : "green"};
`;