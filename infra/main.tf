terraform {
  required_version = ">= 1.4.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.13.1"
    }
  }
}

provider "aws" {
  region  = var.region
}

# Project wide locals
locals {
  project_pascalcase_name = "TeamTrackFrontend"
  project_dashcase_name   = "team-track-frontend"
  common_tags = {
    Name        = local.project_pascalcase_name
    Project     = local.project_pascalcase_name
    TeamProject = "Jokers"
    Domain      = "Operations"
    #    CostCenter  = "141014"
  }
}
