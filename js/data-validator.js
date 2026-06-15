/**
 * Data Validation Module
 * Validates the PortfolioConfig structure before rendering.
 *
 * Validates: Requirements 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7
 */

/**
 * Validates that a name field is a non-empty string with max 200 characters.
 * @param {*} value - The value to validate
 * @param {string} field - The field name for error reporting
 * @returns {Array<{field: string, reason: string}>} Array of errors (empty if valid)
 */
export function validateName(value, field) {
  const errors = [];
  if (typeof value !== 'string' || value.trim().length === 0) {
    errors.push({ field, reason: 'Must be a non-empty string' });
  } else if (value.length > 200) {
    errors.push({ field, reason: 'Must not exceed 200 characters' });
  }
  return errors;
}

/**
 * Validates that a proficiency value is an integer between 0 and 100 inclusive.
 * @param {*} value - The value to validate
 * @param {string} field - The field name for error reporting
 * @returns {Array<{field: string, reason: string}>} Array of errors (empty if valid)
 */
export function validateProficiency(value, field) {
  const errors = [];
  if (!Number.isInteger(value) || value < 0 || value > 100) {
    errors.push({ field, reason: 'Must be an integer between 0 and 100 inclusive' });
  }
  return errors;
}

/**
 * Validates that an email contains exactly one "@" followed by a domain
 * with at least one ".", and total length does not exceed 254 characters.
 * @param {*} value - The value to validate
 * @param {string} field - The field name for error reporting
 * @returns {Array<{field: string, reason: string}>} Array of errors (empty if valid)
 */
export function validateEmail(value, field) {
  const errors = [];
  if (typeof value !== 'string') {
    errors.push({ field, reason: 'Must be a string' });
    return errors;
  }
  if (value.length > 254) {
    errors.push({ field, reason: 'Must not exceed 254 characters' });
    return errors;
  }
  const atParts = value.split('@');
  if (atParts.length !== 2) {
    errors.push({ field, reason: 'Must contain exactly one "@" character' });
    return errors;
  }
  const domain = atParts[1];
  if (!domain.includes('.')) {
    errors.push({ field, reason: 'Domain must contain at least one "."' });
  }
  return errors;
}

/**
 * Validates that a URL starts with "http://" or "https://" and does not exceed 2048 characters.
 * @param {*} value - The value to validate
 * @param {string} field - The field name for error reporting
 * @returns {Array<{field: string, reason: string}>} Array of errors (empty if valid)
 */
export function validateUrl(value, field) {
  const errors = [];
  if (typeof value !== 'string') {
    errors.push({ field, reason: 'Must be a string' });
    return errors;
  }
  if (value.length > 2048) {
    errors.push({ field, reason: 'Must not exceed 2048 characters' });
    return errors;
  }
  if (!value.startsWith('http://') && !value.startsWith('https://')) {
    errors.push({ field, reason: 'Must start with "http://" or "https://"' });
  }
  return errors;
}

/**
 * Validates that skillTags is an array with 1-20 items, each a non-empty string max 50 characters.
 * @param {*} value - The value to validate
 * @param {string} field - The field name for error reporting
 * @returns {Array<{field: string, reason: string}>} Array of errors (empty if valid)
 */
export function validateSkillTags(value, field) {
  const errors = [];
  if (!Array.isArray(value)) {
    errors.push({ field, reason: 'Must be an array' });
    return errors;
  }
  if (value.length < 1 || value.length > 20) {
    errors.push({ field, reason: 'Must contain between 1 and 20 items' });
    return errors;
  }
  value.forEach((tag, index) => {
    if (typeof tag !== 'string' || tag.trim().length === 0) {
      errors.push({ field: `${field}[${index}]`, reason: 'Each tag must be a non-empty string' });
    } else if (tag.length > 50) {
      errors.push({ field: `${field}[${index}]`, reason: 'Each tag must not exceed 50 characters' });
    }
  });
  return errors;
}

/**
 * Validates the full PortfolioConfig structure.
 * Checks all important fields and returns a result object with validity status and errors.
 * Logs all validation errors to the console.
 *
 * @param {Object} config - The PortfolioConfig object to validate
 * @returns {{valid: boolean, errors: Array<{field: string, reason: string}>}}
 */
export function validateConfig(config) {
  const errors = [];

  if (!config || typeof config !== 'object') {
    errors.push({ field: 'config', reason: 'Configuration must be a non-null object' });
    logErrors(errors);
    return { valid: false, errors };
  }

  // Validate personal.name
  if (config.personal) {
    errors.push(...validateName(config.personal.name, 'personal.name'));

    // Validate personal.email
    if (config.personal.email) {
      errors.push(...validateEmail(config.personal.email, 'personal.email'));
    }

    // Validate personal.linkedin URL
    if (config.personal.linkedin) {
      errors.push(...validateUrl(config.personal.linkedin, 'personal.linkedin'));
    }

    // Validate personal.resumeUrl if present (skip relative paths)
    if (config.personal.resumeUrl && config.personal.resumeUrl !== '#' && !config.personal.resumeUrl.startsWith('assets/')) {
      errors.push(...validateUrl(config.personal.resumeUrl, 'personal.resumeUrl'));
    }
  }

  // Validate hero section
  if (config.hero) {
    errors.push(...validateName(config.hero.name, 'hero.name'));

    // Validate hero.skillTags
    errors.push(...validateSkillTags(config.hero.skillTags, 'hero.skillTags'));

    // Validate hero.resumeUrl if present (skip relative paths)
    if (config.hero.resumeUrl && config.hero.resumeUrl !== '#' && !config.hero.resumeUrl.startsWith('assets/')) {
      errors.push(...validateUrl(config.hero.resumeUrl, 'hero.resumeUrl'));
    }
  }

  // Validate skills proficiency values
  if (Array.isArray(config.skills)) {
    config.skills.forEach((category, catIndex) => {
      if (Array.isArray(category.skills)) {
        category.skills.forEach((skill, skillIndex) => {
          errors.push(
            ...validateProficiency(
              skill.proficiency,
              `skills[${catIndex}].skills[${skillIndex}].proficiency (${skill.name || 'unknown'})`
            )
          );
        });
      }
    });
  }

  // Validate contact.email
  if (config.contact) {
    if (config.contact.email) {
      errors.push(...validateEmail(config.contact.email, 'contact.email'));
    }

    // Validate contact.linkedin URL
    if (config.contact.linkedin) {
      errors.push(...validateUrl(config.contact.linkedin, 'contact.linkedin'));
    }
  }

  // Validate project links
  if (Array.isArray(config.projects)) {
    config.projects.forEach((project, index) => {
      if (project.link && project.link !== '#') {
        errors.push(...validateUrl(project.link, `projects[${index}].link`));
      }
    });
  }

  // Log all errors to console
  logErrors(errors);

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Logs validation errors to the console.
 * @param {Array<{field: string, reason: string}>} errors
 */
function logErrors(errors) {
  if (errors.length > 0) {
    console.error('[PortfolioConfig Validation] Errors found:');
    errors.forEach(({ field, reason }) => {
      console.error(`  - ${field}: ${reason}`);
    });
  }
}
