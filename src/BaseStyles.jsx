import styled from 'styled-components'

export const bodyPadding = '1.75em'

const padding = {
  horizontal: `0 ${bodyPadding}`,
  left: `0 0 0 ${bodyPadding}`,
  right: `0 ${bodyPadding} 0 0`,
  none: '0',
}

export const Container = styled.div`
  padding: ${({ smPadding = 'horizontal' }) => padding[smPadding]};
  margin-bottom: 4.5em;

  ${({ mdPadding = null }) =>
    mdPadding &&
    `
      @media (min-width: 48em) {
        padding: ${padding[mdPadding]};
      }
    `}

  @media (min-width: 80em) {
    padding: ${({ lgPadding = 'none' }) => padding[lgPadding]};
    max-width: 78em;
    margin: 0 auto 5.5em;
  }
`

export const Heading = styled.h2`
  font-size: 1.875em;
  line-height: 1;
  margin: 1em 0;
  font-family: 'DM Serif Display', serif;
  font-weight: normal;
  color: #4b4b4b;

  @media (min-width: 48em) {
    font-size: 2.75em;
  }

  @media (min-width: 80em) {
    font-size: 4em;
  }
`

export const SubHeading = styled(Heading)`
  font-size: 1.25em;

  @media (min-width: 48em) {
    font-size: 1.5em;
  }

  @media (min-width: 80em) {
    font-size: 2em;
  }
`
