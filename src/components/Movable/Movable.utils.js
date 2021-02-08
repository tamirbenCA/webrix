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

import {clamp, toCSS} from 'utility/rect';

/**
 *
 * @param rect {{top: number, left: number, width: number, height: number}}
 * @param container {{top: number, left: number, width: number, height: number}}
 * @return {{top: number, left: number, width: number, height: number}}
 */
export const inscribe = (rect, container) => toCSS(clamp(
    rect,
    {...rect, left: container.left + container.width - rect.width, top: container.top + container.height - rect.height},
    {...rect, left: container.left, top: container.top}
));