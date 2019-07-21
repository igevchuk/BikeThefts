import * as React from 'react';
import { Loader as SemanticLoader } from 'semantic-ui-react';

export const Loader: React.SFC = ({ ...rest }) => (
    <SemanticLoader inverted={false} active={true} size='small' {...rest} data-test="loader-component" />
);
