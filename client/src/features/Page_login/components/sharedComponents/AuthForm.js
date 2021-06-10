import React from "react";

export default function AuthForm({
  header,
  children,
  handleSubmit,
  handleButtonClick,
  onSubmit,
  errors,
  serverErrorMessage,
}) {
  const renderErrorMessage = () => {
    return serverErrorMessage ? serverErrorMessage : "";
  };
  return (
    <>
      <header>
        <h3 className="text-th-secondary text-4xl font-openSans mb-12 mt-4">
          {header}
        </h3>
      </header>
      {errors.login_username && (
        <div className="text-th-error text-xs uppercase font-openSans"></div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center max-w-md"
        action=""
      >
        <div className="absolute text-th-error transform -translate-y-full">
          {renderErrorMessage()}
        </div>
        {children}
      </form>
    </>
  );
}
