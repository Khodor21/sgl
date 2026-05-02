import Accordion from "./Accordion";

export default function FAQ() {
  return (
    <div className="mt-10 flex flex-col gap-3">
      <h2 className="text-xl font-extrabold text-[#222222] mb-2">
        Frequently Asked Questions
      </h2>
      <Accordion title="Does the case support wireless charging?">
        Yes, the case comes with magnetic support that helps securely and
        comfortably align a MagSafe wireless charger.
      </Accordion>
      <Accordion title="Is the ring grip removable?">
        The ring grip is built into the case design and made from durable
        long-lasting material. It folds flat when not in use.
      </Accordion>
      <Accordion title="Which iPhone models are compatible?">
        This case is designed specifically for iPhone 17 Pro and iPhone 17 Pro
        Max.
      </Accordion>
      <Accordion title="What is the return policy?">
        You can return the product within 14 days of receipt, provided it is in
        its original condition with packaging. Return shipping is free.
      </Accordion>
    </div>
  );
}
