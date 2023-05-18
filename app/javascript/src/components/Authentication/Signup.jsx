import React, { useEffect, useState } from "react";

import { auth as authApi, organizations as organizationsApi } from "apis";

import SignupForm from "components/Authentication/Form/Signup";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(
    organizations[0]
  );
  const [loading, setLoading] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await authApi.signup({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        organization_id: selectedOrganizationId,
      });
      setLoading(false);
      history.push("/login");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const getOrganizations = async () => {
    try {
      const {
        data: { organizations },
      } = await organizationsApi.list();

      setOrganizations(organizations);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrganizations();
  }, []);

  return (
    <SignupForm
      defaultOrganization={organizations[0]}
      handleSubmit={handleSubmit}
      loading={loading}
      organizations={organizations}
      setEmail={setEmail}
      setName={setName}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      setSelectedOrganizationId={setSelectedOrganizationId}
    />
  );
};

export default Signup;
