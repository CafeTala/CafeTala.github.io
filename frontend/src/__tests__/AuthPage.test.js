import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthPage from '../pages/AuthPage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock server setup
const server = setupServer(
  rest.post('/auth/otp', (req, res, ctx) => {
    return res(ctx.json({ message: 'کد تایید با موفقیت ارسال شد.' }));
  }),
  rest.post('/auth/login', (req, res, ctx) => {
    return res(ctx.json({
      token: 'mock-token',
      user: {
        id: 'mock-user-id',
        phone: req.body.phone,
        preferences: {
          favoriteCurrencies: ['USD'],
          primaryCurrency: 'USD'
        }
      }
    }));
  }),
  rest.post('/auth/guest', (req, res, ctx) => {
    return res(ctx.json({
      token: 'mock-guest-token',
      guest: {
        id: req.body.deviceId
      }
    }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders AuthPage and sends OTP', async () => {
  render(<AuthPage />);

  fireEvent.change(screen.getByLabelText(/شماره تلفن/i), {
    target: { value: '1234567890' },
  });
  fireEvent.click(screen.getByText(/ارسال کد/i));

  await waitFor(() => {
    expect(screen.getByText(/کد تایید با موفقیت ارسال شد./i)).toBeInTheDocument();
  });
});

test('handles login with OTP', async () => {
  render(<AuthPage />);

  fireEvent.change(screen.getByLabelText(/شماره تلفن/i), {
    target: { value: '1234567890' },
  });
  fireEvent.click(screen.getByText(/ارسال کد/i));

  await waitFor(() => {
    expect(screen.getByText(/کد تایید با موفقیت ارسال شد./i)).toBeInTheDocument();
  });

  fireEvent.change(screen.getByLabelText(/کد تایید/i), {
    target: { value: '123456' },
  });
  fireEvent.click(screen.getAllByText(/ورود/i)[0]); // Use getAllByText to select the correct button

  await waitFor(() => {
    expect(screen.getByText(/ورود با موفقیت انجام شد!/i)).toBeInTheDocument();
  });
});

test('handles guest login', async () => {
  render(<AuthPage />);

  fireEvent.click(screen.getByRole('button', { name: /ورود مهمان/i })); // Use getByRole to select the correct button

  await waitFor(() => {
    expect(screen.getByText(/ورود مهمان با موفقیت انجام شد!/i)).toBeInTheDocument();
  });
});
