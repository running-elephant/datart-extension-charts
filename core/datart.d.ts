/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface IChartLifecycle {
  /**
   * Mount event with params `option` and `context`
   *
   * @abstract
   * @param {*} options
   * @param {*} [context]
   * @memberof DatartChartBase
   */
  onMount(options, context?): void;

  /**
   * Update event with params `option` and `context`
   *
   * @abstract
   * @param {*} options
   * @param {*} [context]
   * @memberof DatartChartBase
   */
  onUpdated(options, context?): void;

  /**
   * UnMount event with params `option` and `context`
   *
   * @abstract
   * @param {*} options
   * @param {*} [context]
   * @memberof DatartChartBase
   */
  onUnMount(options, context?): void;

  /**
   * Resize event with params `option` and `context`
   *
   * @abstract
   * @param {*} options
   * @param {*} [context]
   * @memberof DatartChartBase
   */
  onResize(options, context?): void;
}

export interface IChart extends IChartLifecycle {
  meta: any;
  config?: any;
  dataset?: any;
  dependency: string[];
  isISOContainer: boolean | string;
  useIFrame?: boolean;

  set state(state: any);
  get state();

  getDependencies(): string[];

  init(config: any);
  registerMouseEvents(events: Array<any>);
  isMatchRequirement(targetConfig?: any): boolean;
}
