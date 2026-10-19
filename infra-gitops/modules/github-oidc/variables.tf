variable "project_name" {
  type        = string
  description = "Name of the project"
}

variable "environment" {
  type        = string
  description = "Deployment environment"
}

variable "github_repository" {
  type        = string
  description = "GitHub repository in the format 'owner/repo'"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to resources"
  default     = {}
}

variable "github_repository_owner" {
  description = "GitHub repository owner"
  type        = string
}

variable "github_repository_owner_id" {
  description = "GitHub owner ID used in immutable OIDC subject claims"
  type        = string
}

variable "github_repository_name" {
  description = "GitHub repository name"
  type        = string
}

variable "github_repository_id" {
  description = "GitHub repository ID used in immutable OIDC subject claims"
  type        = string
}
