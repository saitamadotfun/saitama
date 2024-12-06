import type { Plan, Subscription, Payment } from "../../lib/bumfi/models";

export namespace Vercel {
  export type BasePayload = {
    id: string;
    createdAt: number;
    region: string;
  };

  export type Deployment = BasePayload & {
    type:
      | "deployment.created"
      | "deployment.succeeded"
      | "deployment.ready"
      | "deployment.promoted"
      | "deployment.canceled"
      | "deployment.error"
      | "deployment.check-rerequested";
    payload: {
      team: {
        id: string[];
      };
      user: {
        id: string[];
      };
      alias: string[];
      deployment: {
        id: string;
        meta: Record<string, any>;
        url: string;
        name: string;
      };
      links: {
        deployment: string;
        project: string;
      };
      target: string;
      project: {
        id: string;
      };
      plan: string;
      regions: string[];
    };
  };

  export type Project = BasePayload & {
    type: "project.created" | "project.removed";
    payload: {
      team: {
        id: string[];
      };
      user: {
        id: string[];
      };
      project: {
        id: string;
        name: string;
      };
    };
  };

  export type IntegrationConfiguration = BasePayload & {
    type:
      | "integration-configuration.scope-change-confirmed"
      | "integration-configuration.removed"
      | "integration-configuration.permisson-upgraded";
    payload: {
      team: {
        id: string[];
      };
      user: {
        id: string[];
      };
      configuration: {
        id: string;
        scopes: string[];
        projectSelection: string;
        projects: string[];
      };
      projects: {
        added: string[];
        removed: string[];
      };
    };
  };

  export type Domain = BasePayload & {
    type: "domain.created";
    payload: {
      team: {
        id: string[];
      };
      user: {
        id: string[];
      };
    };
    domain: string;
    delegated: string;
  };

  export type Payload = Deployment | Project | IntegrationConfiguration;

  export const reverseEventToStatus = (
    value:
      | "deployment.created"
      | "deployment.succeeded"
      | "deployment.ready"
      | "deployment.promoted"
      | "deployment.canceled"
      | "deployment.error"
      | "deployment.check-rerequested"
  ) =>
    value === "deployment.created"
      ? "QUEUED"
      : value === "deployment.canceled"
      ? "CANCELED"
      : value === "deployment.error"
      ? "ERROR"
      : value === "deployment.ready"
      ? "READY"
      : value === "deployment.succeeded"
      ? "READY"
      : "BUILDING";
}

export namespace Boomfi {
  type PlanEvent<T extends string> = {
    event: T;
    description: string;
    type: "OneTime" | "Recurring";
    created_at: string;
  } & Pick<
    Plan,
    | "id"
    | "org_id"
    | "name"
    | "billing_scheme"
    | "price"
    | "currency"
    | "available_quantity"
    | "reference"
    | "metadata"
    | "enable"
    | "created_by"
    | "updated_at"
    | "source"
  > &
    Partial<
      Pick<
        Plan,
        | "trial_period"
        | "recurring_interval"
        | "recurring_interval_count"
        | "recurring_usage_type"
      >
    >;

  type PlanCreatedOrUpdatedEvent = PlanEvent<"Plan.Created" | "Plan.Updated">;

  type SubscriptionEvent<T extends string> = { event: T } & Pick<
    Subscription,
    | "id"
    | "customer_id"
    | "created_at"
    | "updated_at"
    | "status"
    | "cancel_at_period_end"
    | "metadata"
    | "reference"
    | "currenncy"
    | "customer"
    | "source"
  >;

  type SubscriptionCreatedOrUpdatedEvent = SubscriptionEvent<
    "Subscription.Created" | "Subscription.Updated" | "Subscription.Canceled"
  >;

  type PaymentEvent<T extends string> = {
    event: T;
    plan: { id: string; reference: string };
  } & Pick<
    Payment,
    | "id"
    | "amount"
    | "created_at"
    | "customer_id"
    | "status"
    | "updated_at"
    | "payment_method"
    | "customer"
  >;

  export type PaymentCreateOrUpdatedEvent = PaymentEvent<
    "Payment.Created" | "Payment.Updated"
  >;

  export type Payload =
    | PlanCreatedOrUpdatedEvent
    | PaymentCreateOrUpdatedEvent
    | SubscriptionCreatedOrUpdatedEvent;
}
