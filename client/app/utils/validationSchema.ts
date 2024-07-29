interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  privacyPolicy: boolean;
}

export const validateForm = (values: FormValues) => {
  const errors: Record<string, string> = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^[0-9]{10,}$/i.test(values.phone)) {
    errors.phone = 'Phone number must be at least 10 digits';
  }

  if (!values.address) {
    errors.address = 'Address is required';
  }

  if (!values.city) {
    errors.city = 'City is required';
  }

  if (!values.state) {
    errors.state = 'State is required';
  }

  if (!values.pincode) {
    errors.pincode = 'Pincode is required';
  } else if (!/^[0-9]{6}$/i.test(values.pincode)) {
    errors.pincode = 'Pincode must be exactly 6 digits';
  }

  if (!values.privacyPolicy) {
    errors.privacyPolicy = 'You must accept the privacy policy';
  }

  return errors;
};
