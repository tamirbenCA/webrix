/**
 * Copyright (c) 2020, Amdocs Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useState, useCallback, useEffect, useRef} from 'react';
import classNames from 'classnames';
import {propTypes, defaultProps} from './Collapsible.props';
import './Collapsible.scss';

export const Collapsible = ({expanded, children, duration, onTransitionEnd, ...props}) => {
    const [{motion, height}, setState] = useState({motion: '', height: expanded ? 'auto' : 0});
    const hasChildren = !!React.Children.count(children);
    const timeout = useRef(), content = useRef();
    const handleOnTransitionEnd = useCallback(e => {
        if (e.propertyName === 'height') {
            onTransitionEnd(e);
        }
    }, [onTransitionEnd]);

    useEffect(() => {
        if (hasChildren) {
            setState({height: content.current.clientHeight, motion: expanded ? 'expanding' : 'collapsing'});
            clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                // requestAnimationFrame is used here so that the state is set after the transition has been completed.
                // Without it, the state may be set too early, and the onTransitionEnd will not be triggered for certain
                // properties.
                window.requestAnimationFrame(() => {
                    setState(state => ({...state, height: expanded ? 'auto' : 0}));
                });
                // Remove the motion after the transition has been completed
                timeout.current = setTimeout(() => {
                    setState(state => ({...state, motion: ''}));
                }, expanded ? 0 : duration);
            }, expanded ? duration : 0);
        }
        return () => clearTimeout(timeout.current);
    }, [hasChildren, expanded, duration]);

    return (
        <div {...props} className={classNames('collapsible', motion, {expanded}, props.className)}>
            {hasChildren && (
                <div
                    className='content-wrapper'
                    onTransitionEnd={handleOnTransitionEnd}
                    style={{height}}>
                    <div className='content' ref={content}>{children}</div>
                </div>
            )}
        </div>
    );
};

Collapsible.propTypes = propTypes;
Collapsible.defaultProps = defaultProps;

export default Collapsible;
