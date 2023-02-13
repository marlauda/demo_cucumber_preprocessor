@demo
Feature: Demo tests

  @intermittent_failure
  Scenario Outline: always fail except during last attempt

    When I trigger different errors depending on the case

    Examples:
      | test |
      | 1    |