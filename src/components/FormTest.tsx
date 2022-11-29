import React, { useState } from 'react';
// import { z } from 'zod';

// make sure to import it properly !
import { Form, useForm } from './Form';
import { Input } from './Input';

// lets declare our validation and shape of form
// zod takes care of email validation, it also supports custom regex! (only if I could understand this language of gods 😂)

// const signUpFormSchema = z.object({
//   firstName: z.string().min(1, 'First Name must be atleast 1 characters long!'),
//   username: z
//     .string()
//     .min(1, 'Username must be atleast 1 characters long!')
//     .max(10, 'Consider using shorter username.'),
//   email: z.string().email('Please enter a valid email address.'),
//   password: z
//     .string()
//     .min(6, 'Please choose a longer password')
//     .max(256, 'Consider using a short password'),
//   // add your fancy password requirements 👿
// });

export function SignUpForm() {
  // this is hook is required to use form
  const form = useForm({
    // schema: signUpFormSchema,
  });

  return (
    <div>
      {/* provide the form and onSubmit handler to form component */}
      <Form form={form} onSubmit={(values) => console.log(values)}>
        <Input
          label="Your first name"
          type="text"
          placeholder="John"
          // press ctrl + space when you type firstName
          {...form.register('firstName', { required: true, minLength: 3, maxLength: 20 })}
        />
        <Input
          label="Choose username"
          type="text"
          placeholder="im_john_doe"
          {...form.register('username', { required: true, minLength: 3, maxLength: 20 })}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          {...form.register('email', { required: true })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Your password (min 5)"
          {...form.register('password', { required: true, minLength: 6, maxLength: 20 })}
        />
        <button type="submit">Submit </button>
      </Form>
    </div>
  );
}
