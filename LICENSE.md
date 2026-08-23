# nomue Protocol Licensing Terms

**Licensor:** Licklider, Inc. ("Licklider")

**Copyright:** © 2026 Licklider, Inc.

## Reader's Guide

This repository uses three legally distinct licensing layers. Human-readable Protocol prose is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0). Software and machine-readable materials are licensed under the Apache License, Version 2.0. Separately, Licklider offers a royalty-free patent license for Essential Claims needed to implement officially published, immutable nomue Protocol specifications. The Protocol Patent Grant is supplemental to, and does not modify, condition, restrict, or terminate, the CC BY 4.0 or Apache-2.0 licenses. Defensive termination under this document affects only the Protocol Patent Grant described below; rights under CC BY 4.0 and Apache-2.0 remain governed exclusively by those licenses.

## 1. Scope and Artifact Classes

Except where a file-specific notice or third-party license states otherwise, materials authored by Licklider in this repository are licensed as follows.

### 1.1 Protocol Prose — CC BY 4.0

Human-readable prose whose primary purpose is to define, explain, govern, or document the nomue Protocol ("Protocol Prose") is licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**.

Protocol Prose includes normative and informative specification prose, governance and explanatory documentation, human-readable security and verification documentation, and human-readable evidence or example documentation. It does not include this `LICENSE.md`, third-party materials, or software and machine-readable materials described in Section 1.2.

As repository defaults, human-readable prose in the root documentation and under `spec/`, `governance/`, `security/`, `mappings/`, `examples/`, `evidence/`, and `canonicalization/` is Protocol Prose unless a more specific rule below or a file-specific notice applies. Human-readable prose embedded in an Apache Materials source tree may instead be treated as part of that Apache-licensed Work when the surrounding source tree or file notice makes that treatment clear.

The canonical CC BY 4.0 legal code is:

https://creativecommons.org/licenses/by/4.0/legalcode

Suggested attribution is:

> nomue Protocol — Licklider, Inc.

CC BY 4.0 applies according to its own terms. Nothing in the Protocol Patent Terms below modifies, conditions, restricts, or terminates rights granted by CC BY 4.0.

### 1.2 Software and Machine-Readable Materials — Apache-2.0

Software and machine-readable materials authored by Licklider in this repository ("Apache Materials") are licensed under the **Apache License, Version 2.0 (Apache-2.0)**.

Apache Materials include source code, reference implementations, verifier code, tooling, bindings, schemas, registries, conformance fixtures, test and canonicalization vectors, structured data, manifests, generated machine-readable artifacts, build and CI configuration, and other materials whose primary purpose is executable or machine-readable rather than explanatory prose.

As repository defaults, all materials under `reference/`, `tooling/`, `bindings/`, `schemas/`, `registries/`, `conformance/`, `generated/`, and `.github/` are Apache Materials unless a file-specific notice states otherwise. Structured machine-readable artifacts elsewhere in the repository, including JSON, YAML, schema, fixture, vector, manifest, and generated-data files under `canonicalization/`, `examples/`, or `evidence/`, are also Apache Materials unless a file-specific notice states otherwise.

The Apache License, Version 2.0 is reproduced in Appendix A and is also available at:

https://www.apache.org/licenses/LICENSE-2.0

Apache-2.0, including its own copyright, patent, contribution, trademark, warranty, termination, and redistribution provisions, applies according to its own terms. Nothing in the Protocol Patent Terms below modifies, conditions, restricts, or terminates rights granted by Apache-2.0, including the patent license and termination rules in Apache-2.0 Section 3.

### 1.3 File-Specific and Third-Party Terms

A file-specific license notice controls for that file to the extent it identifies different terms. Absent a file-specific notice, the substance-based classifications in Sections 1.1 and 1.2 control over the path-based defaults when the two clearly differ. Third-party materials remain subject to their own copyright, patent, trademark, and other applicable terms. Licklider grants no rights it does not own or have authority to grant.

## 2. Independence and Precedence of the Licensing Layers

The CC BY 4.0 license, the Apache-2.0 license, and the Protocol Patent Grant in this document are separate and independent grants.

1. CC BY 4.0 exclusively governs the copyright and similar rights it licenses in Protocol Prose.
2. Apache-2.0 exclusively governs the rights it grants in Apache Materials.
3. Sections 3 through 9 of this document govern only the supplemental Protocol Patent Grant made directly by Licklider.

If any provision of Sections 3 through 9 could be read to conflict with CC BY 4.0 or Apache-2.0 as applied to material licensed under those licenses, the applicable CC BY 4.0 or Apache-2.0 term controls for those licensed rights. No Protocol Patent Term is a condition on the exercise of rights granted under CC BY 4.0 or Apache-2.0.

## 3. Definitions for the Protocol Patent Grant

### 3.1 Covered Specification

A **Covered Specification** is an immutable version of the nomue Protocol that Licklider has officially published as a Public Draft, Stable specification, or equivalent official specification release, and that is identified by a canonical release identity and a published Protocol snapshot hash or equivalent immutable content identity.

A working branch, pull request, arbitrary state of `main`, unpublished Release Candidate, private research artifact, or third-party fork is not a Covered Specification merely because it derives from or resembles the nomue Protocol.

A third-party fork may continue to exercise rights applicable to the Licklider-published Covered Specification from which it derives, but the fork's own additions or changes do not become a Covered Specification unless Licklider separately and officially publishes them as one.

### 3.2 Normative Requirements

**Normative Requirements** are requirements that a Covered Specification identifies as normative through its authoritative specification, requirement, registry, or conformance machinery, including normative mandatory, recommended, or optional requirements (including requirements expressed with terms such as MUST, SHOULD, or MAY, or their defined equivalents).

Informative notes, examples, implementation guidance, reference-implementation choices, and other non-normative material are not Normative Requirements.

A normative optional feature remains a Normative Requirement for purposes of these Patent Terms when an implementation elects to implement that feature in conformance with the Covered Specification.

### 3.3 Conforming Implementation

A **Conforming Implementation** is an implementation that satisfies the conformance requirements of a Covered Specification for the Protocol portions it claims to implement, including the applicable requirements for any normative optional feature it elects to implement.

### 3.4 Essential Claims

**Essential Claims** are patent claims that:

1. are owned or controlled by Licklider, or later become owned or controlled by Licklider;
2. are licensable by Licklider without Licklider becoming obligated to make a payment to, or accept a new obligation owed to, any other person or entity to whom Licklider is not already obligated as a condition of licensing that claim; and
3. as evaluated using the state of the art on the date the applicable Covered Specification was first officially published, would necessarily be infringed by a Conforming Implementation of a Normative Requirement because no technically feasible non-infringing alternative exists for implementing that Normative Requirement as specified.

Essential Claims include only the claim scope that is technically unavoidable for implementation of the applicable Normative Requirement. Other claims in the same patent are not Essential Claims merely because one claim is essential.

Essential Claims do **not** include claims infringed only by or because of:

- informative material, examples, or implementation guidance;
- reference-implementation-specific choices;
- implementation or performance optimizations, including advanced numerical optimizations;
- deployment architecture, infrastructure, hosting, or SaaS functionality;
- orchestration, agent management, policy management, enterprise management, or workflow-management techniques;
- proprietary extensions or functionality not required by the Covered Specification;
- enabling technologies that are not themselves described as Normative Requirements;
- third-party technology merely referenced by the Covered Specification rather than specified in detail as a Normative Requirement;
- combinations with technology or functionality not required by the Covered Specification; or
- any other subject matter that is not a Normative Requirement of the Covered Specification.

### 3.5 Recipient

A **Recipient** is a person or legal entity that exercises or seeks to exercise rights under the Protocol Patent Grant. A person or entity that expressly rejects the Protocol Patent Terms receives no patent rights under them, without affecting any separate rights it may have under CC BY 4.0 or Apache-2.0.

A person or entity whose Protocol Patent Grants have been terminated under Section 5 is not an eligible Recipient for purposes of Section 4 with respect to any Covered Specification, including any Covered Specification officially published after the termination, unless and until Licklider expressly reinstates that person or entity's eligibility in a writing signed by an authorized signatory of Licklider and expressly identifying the Recipient and the scope of reinstatement. For the avoidance of doubt, the automatic issuance of a Protocol Patent Grant under Section 4 upon publication of a later Covered Specification does not apply to a Recipient that is not eligible under this paragraph.

### 3.6 Controlled Entity

A **Controlled Entity** of a Recipient is an entity that the Recipient directly or indirectly controls through either:

1. ownership of more than fifty percent (50%) of the voting power or equivalent ownership interests; or
2. the legal or contractual power to direct the management of that entity.

An entity is not a Controlled Entity merely because it is an investor, parent, sibling, commercial partner, licensor, licensee, or other related entity absent the control described above.

### 3.7 Covered Patent Action

A **Covered Patent Action** is a patent infringement action in which a Recipient, a Controlled Entity of that Recipient, or a person acting at the Recipient's direction, control, or instruction files, maintains as an asserting party, knowingly and voluntarily participates as an asserting party, or directs or controls a claim alleging that implementation of the Normative Requirements of a Covered Specification by Licklider or by any third-party Conforming Implementation infringes a patent.

A patent dispute concerning functionality that is independent of implementing the Normative Requirements of a Covered Specification is not a Covered Patent Action merely because one or more parties also implement nomue Protocol.

## 4. Licklider Protocol Essential Claims Patent Grant

For each Covered Specification, subject only to these Protocol Patent Terms, Licklider grants each eligible Recipient a **worldwide, royalty-free, no-charge, non-exclusive, non-sublicensable patent license** under Licklider's Essential Claims to:

- make;
- have made, solely for that Recipient and solely for the purpose of making a Conforming Implementation for that Recipient;
- use;
- offer for sale;
- sell;
- import;
- distribute; and
- otherwise transfer

Conforming Implementations, but only to the extent necessary to implement the Normative Requirements of that Covered Specification.

The grant for a Covered Specification becomes available when that Covered Specification is officially published and continues for the life of the applicable Essential Claims, unless terminated under Section 5.

Every eligible Recipient receives this Protocol Patent Grant directly from Licklider. No Recipient needs authority to sublicense Licklider's Essential Claims to downstream implementers or users who independently qualify for the grant. A person or entity that is not an eligible Recipient under Section 3.5 does not receive a Protocol Patent Grant under this Section, whether by direct issuance, downstream distribution, sublicense, or otherwise.

No license is granted by implication, estoppel, or otherwise to patent claims that are not Essential Claims.

## 5. Defensive Termination

### 5.1 Trigger

If a Recipient becomes responsible for a Covered Patent Action, all Protocol Patent Grants from Licklider to that Recipient terminate automatically as provided in this Section.

A Recipient is responsible for a Covered Patent Action if the Recipient:

1. files or maintains the Covered Patent Action as an asserting party;
2. knowingly and voluntarily participates in the Covered Patent Action as an asserting party; or
3. directs, controls, or instructs a Controlled Entity or other person to file, maintain, or assert the Covered Patent Action.

### 5.2 First-Brought Defensive Action Exception

A counterclaim, cross-claim, or declaratory-judgment claim asserted by a Recipient does not by itself trigger Section 5.1 if, and only if:

1. it is directly responsive to, and reasonably necessary to defend against, a patent action (whether or not that patent action itself relates to a Covered Specification) that was first filed against the Recipient or its Controlled Entity by Licklider or by another person or entity; and
2. it is limited to patent claims, accused products or conduct, defenses, and remedies reasonably necessary to defend against that first-filed action.

For the avoidance of doubt, this exception applies whether the first-filed action was brought by Licklider or by a third party, and whether or not the first-filed action alleges infringement of a Covered Specification's Normative Requirements.

This exception does not protect an offensive patent claim merely because it is procedurally styled as a counterclaim, cross-claim, declaratory-judgment claim, or other response. A counterclaim, cross-claim, or declaratory-judgment claim that exceeds the scope described in item 2 above is treated as an independent assertion for purposes of Section 5.1 to the extent of that excess.

### 5.3 Effect and Timing

Termination is effective automatically, without notice, as of the date the Recipient first becomes responsible for the Covered Patent Action.

Termination under this Section ends **all Protocol Essential Claims Patent Grants made by Licklider to that Recipient for all Covered Specifications**, not merely a grant relating to the patent or Covered Specification involved in the Covered Patent Action.

After termination, the Recipient is not eligible to receive a new Protocol Patent Grant for any later Covered Specification unless and until Licklider expressly reinstates eligibility in a writing signed by an authorized signatory of Licklider and expressly identifying the Recipient and the scope of reinstatement.

Withdrawal, dismissal, settlement, cessation, or other termination of the Covered Patent Action does not automatically reinstate any Protocol Patent Grant.

Licklider may expressly reinstate a Recipient's eligibility or one or more terminated grants, in whole or in part, only in a writing signed by an authorized signatory of Licklider that expressly identifies the Recipient and the scope of reinstatement, on terms consistent with applicable law.

### 5.4 Copyright and Apache Rights Are Unaffected

For the avoidance of doubt, termination under this Section terminates only the supplemental Protocol Patent Grant made under this document. It does **not** terminate, restrict, condition, or modify:

- rights the Recipient has under CC BY 4.0 for Protocol Prose; or
- rights the Recipient has under Apache-2.0 for Apache Materials, including any Apache-2.0 patent license, which remains subject only to Apache-2.0's own terms and termination provisions.

### 5.5 Anti-Circumvention

For purposes of this Section, an action taken by a Controlled Entity or other person at a Recipient's direction, control, or instruction is treated as an action of the Recipient. A Recipient may not avoid defensive termination by causing another person or entity to assert a Covered Patent Action on its behalf.

## 6. Successors, Assigns, and Transfers of Essential Claims

The Protocol Patent commitments made by Licklider for a Covered Specification are intended to remain effective for the life of the applicable Essential Claims notwithstanding a merger, reorganization, patent transfer, assignment, or exclusive license.

To the fullest extent permitted by law:

1. these Protocol Patent commitments bind Licklider's successors in interest and assigns with respect to rights they acquire from Licklider; and
2. if Licklider voluntarily transfers ownership of, or voluntarily grants exclusive third-party enforcement rights in, a patent that Licklider knows contains an Essential Claim already subject to a Protocol Patent Grant, Licklider will condition that transfer or exclusive license on written notice of these commitments and a written undertaking by the transferee or exclusive licensee to respect the existing commitments for the applicable Covered Specifications. If applicable law, bankruptcy, compulsory process, court order, or another transfer outside Licklider's control prevents Licklider from imposing that condition, Licklider will, to the extent legally permitted and practicable, provide written notice of these commitments to the transferee or exclusive licensee.

Nothing in this Section expands the Protocol Patent Grant to patents or claims that are not Essential Claims for a Covered Specification.

Licklider will not intentionally structure a transfer, assignment, or exclusive enforcement arrangement for the purpose of circumventing an existing Protocol Patent commitment.

Nothing in this document requires Licklider to conduct a patent search.

## 7. External Contributions

### 7.1 Feedback Is Not a Normative Patent Contribution

Except to the extent Apache-2.0 Section 5 independently applies to an intentionally submitted contribution to Apache Materials, discussion, feedback, issue reports, feature requests, suggestions, and similar communications do not, by themselves, create a Protocol Patent Grant, an Essential Claims commitment, or an accepted normative contribution to the nomue Protocol.

### 7.2 External Normative Contributions Require a Separate Contributor Agreement

An **External Normative Contribution** is material authored by any person or entity other than Licklider or a Licklider employee acting within the scope of employment, whose incorporation would alter the normative meaning, requirements, interpretation, or conformance behavior of the nomue Protocol. A contractor or other non-employee is excluded from this definition only when a written agreement with Licklider already grants Licklider sufficient copyright and patent rights for the relevant contribution. This classification depends on semantic effect, not file format or outbound copyright license. It may therefore include specification prose, code, schemas, registries, conformance artifacts, fixtures, vectors, or other machine-readable material.

Licklider does not accept an External Normative Contribution into the normative nomue Protocol unless Licklider and the contributor first enter into a separate written Contributor Agreement applicable to that contribution.

No External Normative Contribution will be incorporated into a Covered Specification until that Contributor Agreement is in effect.

### 7.3 Apache-2.0 Code Contributions

Contributions intentionally submitted for inclusion in Apache Materials are governed by Apache-2.0, including Apache-2.0 Section 5, unless a separate contribution agreement states otherwise.

A contribution that would alter Protocol normative meaning remains subject to Section 7.2 even if the file or artifact is otherwise Apache-2.0 licensed. Ordinary non-normative software, tooling, documentation infrastructure, test-harness, or infrastructure contributions may be accepted under Apache-2.0 without becoming External Normative Contributions.

## 8. Third-Party Patents and No Patent Warranty

The Protocol Patent Grant covers only Essential Claims that Licklider has authority to license. Licklider makes no patent commitment for third-party patents or for third-party technology merely referenced by a Covered Specification.

Licklider does not represent or warrant that:

- Licklider owns any patent containing an Essential Claim;
- any patent or patent claim is valid, enforceable, or essential;
- a Conforming Implementation is free from infringement of third-party intellectual-property rights; or
- implementation of the nomue Protocol eliminates the need for an implementer to evaluate its own legal risks.

The existence of the Protocol Patent Grant is not a patent-clearance opinion or a warranty of non-infringement.

## 9. Patent-Term Disclaimer, Severability, and No Waiver

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE PROTOCOL PATENT GRANT AND THE COVERED SPECIFICATIONS ARE PROVIDED FOR PURPOSES OF THESE PATENT TERMS "AS IS," WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE.

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, LICKLIDER WILL NOT BE LIABLE UNDER THESE PROTOCOL PATENT TERMS FOR INDIRECT, SPECIAL, INCIDENTAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES ARISING FROM THE EXERCISE OR NON-EXERCISE OF THE PROTOCOL PATENT GRANT.

These disclaimers supplement, and do not reduce or modify, the separate disclaimers and limitations contained in CC BY 4.0 and Apache-2.0 for materials governed by those licenses.

If any provision of Sections 3 through 9 is held unenforceable, it will be reformed to the minimum extent necessary to make it enforceable where permitted; otherwise it will be severed without affecting the remaining Protocol Patent Terms or the separate CC BY 4.0 and Apache-2.0 licenses.

No waiver of a Protocol Patent Term is effective unless made expressly in writing by Licklider.

## 10. Trademarks, Names, and No Endorsement

No trademark, service mark, trade name, certification mark, logo, or other branding right is granted by this document, including rights in the names "Licklider," "nomue," "nomue Protocol," or "nomue Record," except for nominative or descriptive uses independently permitted by applicable law.

Use, implementation, verification, conformance, distribution, or modification of the nomue Protocol does not imply certification, endorsement, sponsorship, approval, scientific validation, or product approval by Licklider.

## 11. Previously Published Specifications and Future Standards-Body Policies

A Protocol Patent Grant that has become effective for a Covered Specification cannot be retroactively reduced or withdrawn except under its own termination provisions.

Licklider may place a future specification under a patent policy of W3C or another standards body, or under another expressly identified patent policy. Any such change applies prospectively only to the future specification for which that other policy is expressly identified.

Protocol Patent Grants already made for previously published Covered Specifications remain in effect according to the terms under which those Covered Specifications were published.

## 12. Effective Operation

These repository licensing terms are effective for materials first made available under them on or after 2026-08-20. Materials carrying a file-specific or third-party notice remain governed as stated in that notice.

## Appendix A — Apache License, Version 2.0

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
