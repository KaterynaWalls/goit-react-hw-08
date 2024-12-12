import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(register(values))
      .unwrap()
      .then(res => {
        toast.success(`Welcome ${res?.user?.name || 'User'}!`);
        resetForm();
        navigate('/contacts');
      })
      .catch(error => {
        toast.error(error.response?.data?.message || 'Something went wrong, try again');
      })
      .finally(() => {
        setSubmitting(false); 
      });
  };

  return (
    <div className={s.wrapper}>
      <h2>Register</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <Field className={s.field} name='name' placeholder='Enter name' />
            <ErrorMessage name='name' component='div' className={s.error} />
            <Field className={s.field} name='email' placeholder='Enter email' />
            <ErrorMessage name='email' component='div' className={s.error} />
            <Field className={s.field} name='password' type='password' placeholder='Enter pass' />
            <ErrorMessage name='password' component='div' className={s.error} />
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
