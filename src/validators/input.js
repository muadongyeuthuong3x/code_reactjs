export const ruleInputRequired = (
  required = true,
  message = "Please input your name!"
) => ({
  required: required,
  message: message,
});

export const ruleInputMin = (min = 1, name = "name") => ({
  min: min,
  message: `${name} must be at least ${min} characters long!`,
});
