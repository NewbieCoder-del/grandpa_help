window.SecurityGuard = {
  confirmSensitiveAction(serviceId, stepIndex) {
    const sensitive =
      (serviceId === "pension" && stepIndex === 1) ||
      (serviceId === "documents" && stepIndex === 1) ||
      (serviceId === "bills" && stepIndex >= 1);

    if (!sensitive) return true;

    return window.confirm(
      "⚠ Security Reminder\nNever share your OTP with unknown callers. Government officials will never ask for your password.\n\nDo you want to continue?"
    );
  }
};
