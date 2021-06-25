import React from 'react';
import {Router, Route} from 'react-router-dom';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {createMemoryHistory} from 'history';
import {render, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectDetails from '../components/Dashboard/ProjectDetails';
import {Project} from '../components/providers';

const server = setupServer(
  rest.get('http://localhost:8080/projects/60b05a4475b84bcee15256d0', (req, res, ctx) => {
    return res(
      ctx.json({
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        services: ['Users', 'payments'],
        serviceCount: 2,
        _id: '60b05a4475b84bcee15256d0',
        name: 'Ebay',
        createdAt: '2021-05-28T02:49:40.496Z',
        updatedAt: '2021-05-28T02:49:40.496Z',
        __v: 0,
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays project details', async () => {
  const history = createMemoryHistory();
  const route = '/dashboard/project-details/60b05a4475b84bcee15256d0';
  history.push(route);

  render(
    <Router history={history}>
      <Project.Provider>
        <Route path="/dashboard/project-details/:id">
          <ProjectDetails />
        </Route>
      </Project.Provider>
    </Router>,
  );

  // wait for state to be updated
  await waitFor(() => screen.getByText('Register Service'));

  // make sure buttons display
  expect(screen.getByText('Register Service'));
  expect(screen.getByText('Edit Project Info'));
  expect(screen.getByText('Delete Project'));
});