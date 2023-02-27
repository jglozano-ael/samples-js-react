/*
 * Copyright (c) 2018-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Header, Icon, Table } from 'semantic-ui-react';

const Forecasts = () => {
  const apiUri = "https://localhost:7158/weatherforecast";
  const {authState, oktaAuth } = useOktaAuth();
  const [forecasts, setForecasts] = useState(null);

  useEffect(() => {
      fetch(apiUri, {
        headers: {
          Authorization: 'Bearer ' + authState.accessToken.accessToken
        }
      })
      .then(resp => resp.json())
      .then(data => {
        setForecasts(data);
      }).catch((err) => {
        console.error(err);
      });
  }, [authState, oktaAuth]); // Update if authState changes

  if (!forecasts) {
    return (
      <div>
        <p>Fetching forecasts...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">
          {' '}
          Weather Forecasts
          {' '}
        </Header>
        <p>Below is a list of demo "weather forecasts" that are behing a proected API.</p>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature</th>
            </tr>
          </thead>
          <tbody>
            {forecasts.map((forecast) => {
              return (
                <tr>
                  <td>{forecast.date}</td>
                  <td>{forecast.temperatureF}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Forecasts;
