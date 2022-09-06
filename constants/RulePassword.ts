
export const RulePassword=[
        {
          required: true,
          message: "Please input your password!",
        },
        {
          pattern: /(?=.*?[A-Z])/,
          message: "At least one upper case English letter,[A-Z]",
        },
        {
          pattern: /(?=.*?[a-z])/,
          message: "At least one lower case English letter,[a-z]",
        },
        {
          pattern: /(?=.*?[0-9])/,
          message: "At least one digit,[0-9]",
        },
        {
          min: 8,
          message: "Must be at least 8 characters",
        },
      ]

