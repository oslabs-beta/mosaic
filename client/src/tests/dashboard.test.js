import React from 'react';
import {Router, Route} from 'react-router-dom';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {createMemoryHistory} from 'history';
import {render, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Projects from '../components/Dashboard/Projects';

const server = setupServer(
  rest.get('http://localhost:8080/projects', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          description:
            'TEST DESCRIPTION',
          services: ['60dd16db70df8a4772831ed6'],
          serviceCount: 2,
          _id: '60a7210af2ee8c64dc1f611a',
          name: 'Netflix',
          createdAt: '2021-05-21T02:55:06.266Z',
          updatedAt: '2021-07-01T01:14:03.901Z',
          __v: 0,
        },
        {
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          services: [
            '60d144319857347dc3f299c2',
            '60d144419857347dc3f299c3',
            '60dbd9871f4b8d072c008bc5',
          ],
          serviceCount: 3,
          _id: '60a722b0edd63565e3dcd6c1',
          name: 'Amazon',
          createdAt: '2021-05-21T03:02:08.931Z',
          updatedAt: '2021-06-30T02:40:07.564Z',
          __v: 0,
        },
        {
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          services: ['60d1445e9857347dc3f299c4'],
          serviceCount: 1,
          _id: '60a722e30b2a0c6615084892',
          name: 'Spotify',
          createdAt: '2021-05-21T03:02:59.463Z',
          updatedAt: '2021-06-22T02:01:02.836Z',
          __v: 0,
        },
        {
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          services: [],
          serviceCount: 1,
          _id: '60ad591eaf295ea39e7dacef',
          name: 'Uber',
          createdAt: '2021-05-25T20:07:58.685Z',
          updatedAt: '2021-05-25T20:07:58.685Z',
          __v: 0,
        },
        {
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          services: [],
          serviceCount: 2,
          _id: '60b05a4475b84bcee15256d0',
          name: 'Ebay',
          createdAt: '2021-05-28T02:49:40.496Z',
          updatedAt: '2021-05-28T02:49:40.496Z',
          __v: 0,
        },
        {
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          services: [],
          serviceCount: 1,
          _id: '60b1357dd3c783dec6387a65',
          name: 'Groupon',
          createdAt: '2021-05-28T18:25:01.678Z',
          updatedAt: '2021-05-28T18:25:01.678Z',
          __v: 0,
        },
      ]),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays dashboard', async () => {
  const history = createMemoryHistory();
  const route = '/';
  history.push(route);

  render(
    <Router history={history}>
      <Route path="/">
        <Projects />
      </Route>
    </Router>,
  );

  // wait for state to be updated
  await waitFor(() => screen.getByText('Amazon'));

  // make sure cards display
  expect(screen.getByText('Add Project'));
  expect(screen.getByText('Uber'));
  expect(screen.getByText('Amazon'));
  expect(screen.getByText('TEST DESCRIPTION'));
});
