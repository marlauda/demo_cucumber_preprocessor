@demo
Feature: Demo tests

  @intermittent_failure
  Scenario Outline: always fail except during last attempt

    When I sometimes trigger an error on purpose
      | error      |
      | Flaky test |

    Examples:
      | test |
      | 1    |
      | 2    |
      | 3    |

  @no_failure
  Scenario Outline: never fail

    When everything is fine

    Examples:
      | test |
      | 1    |
      | 2    |
      | 3    |