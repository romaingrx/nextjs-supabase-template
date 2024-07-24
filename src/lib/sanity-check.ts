import { EnvVar, app_settings } from '@/app_settings'

export function sanity_check(): void {
  sanity_check_envs()
}

function get_env_name(env: EnvVar): string {
  return typeof env === 'string' ? env : env.name
}

function sanity_check_envs(): void {
  let missing_env_vars = []

  for (const [severity, env_vars] of Object.entries(app_settings.envs)) {
    for (const env_var of env_vars) {
      const env_name = get_env_name(env_var)
      if (!process.env[env_name]) {
        missing_env_vars.push({
          name: env_name,
          severity: severity as 'OPTIONAL' | 'REQUIRED',
        })
      }
    }
  }

  if (missing_env_vars.length > 0) {
    console.log('Missing Environment Variables:')
    for (const env_var of missing_env_vars) {
      console.log(`- ${env_var.name} (${env_var.severity})`)
    }
  }

  if (
    missing_env_vars.filter((env_var) => env_var.severity === 'REQUIRED')
      .length > 0
  ) {
    process.exit(1)
  }
}

// @ts-ignore
if (import.meta.main) {
  sanity_check()
}
