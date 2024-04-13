import google.generativeai as palm
import key

palm.configure(api_key=key.mkey)

defaults = {
    "model": "models/text-bison-001",
    "temperature": 0.7,
    "candidate_count": 1,
    "top_k": 40,
    "top_p": 0.95,
    "max_output_tokens": 1024,
    "stop_sequences": [],
    "safety_settings": [
        {"category": "HARM_CATEGORY_DEROGATORY", "threshold": 1},
        {"category": "HARM_CATEGORY_TOXICITY", "threshold": 1},
        {"category": "HARM_CATEGORY_VIOLENCE", "threshold": 2},
        {"category": "HARM_CATEGORY_SEXUAL", "threshold": 2},
        {"category": "HARM_CATEGORY_MEDICAL", "threshold": 2},
        {"category": "HARM_CATEGORY_DANGEROUS", "threshold": 2},
    ],
}


authorities_resolving_complaints = [
    "Consumer Forum (National Consumer Disputes Redressal Commission)",
    "State Consumer Disputes Redressal Commission",
    "District Consumer Disputes Redressal Forum",
    "Reserve Bank of India (RBI)",
    "Telecom Regulatory Authority of India (TRAI)",
    "Insurance Regulatory and Development Authority of India (IRDAI)",
    "Securities and Exchange Board of India (SEBI)",
    "Central Electricity Regulatory Commission (CERC)",
    "State Electricity Regulatory Commission (SERC)",
    "Real Estate Regulatory Authority (RERA)",
    "Food Safety and Standards Authority of India (FSSAI)",
    "National Human Rights Commission (NHRC)",
    "State Human Rights Commission (SHRC)",
    "National Commission for Women (NCW)",
    "National Commission for Protection of Child Rights (NCPCR)",
    "National Green Tribunal (NGT)",
    "State Pollution Control Board (SPCB)",
    "Public Works Department (PWD)",
    "National Commission for Minorities (NCM)",
    "National Commission for Scheduled Castes (NCSC)",
    "National Commission for Scheduled Tribes (NCST)",
    "National Commission for Backward Classes (NCBC)",
    "Police",
]


def get_formatted_authorities():
    return "\n".join(authorities_resolving_complaints)


def get_complaint_resolver_authority_from_complaint_description(complaint_description):
    response = palm.generate_text(
        **defaults,
        prompt=f"I am a citizen of India. I have a complaint: {complaint_description}\n\nHere are the list of authorities that can help me resolve my complaint:\n\n{get_formatted_authorities()}\n\nChoose the authority that can help me resolve my complaint. Only answer the authority name.",
    )

    return response.result


def get_priority_of_the_complaint(complaint_description):
    response = palm.generate_text(
        **defaults,
        prompt=f"I am a citizen of India. I have a complaint: {complaint_description}. What is the priority of this complaint? Only answer a digit from 1 to 3. 1 being the highest priority and 3 being the lowest priority. If you think the complaint is not a priority, type 1. If life threats and financial scams the priority should be high. If criminal offences which are not life threatening but still require attention, mark it as 2. If these are not very critical complaints, the priority should be 3",
    )

    return response.result


isDM = False

if __name__ == "__main__":
    import sys

    if sys.argv[1] == "get_priority":
        priority = get_priority_of_the_complaint(sys.argv[2])
        if priority and priority.isdigit():
            print(priority)
        else:
            print(3)
    else:
        print(get_complaint_resolver_authority_from_complaint_description(sys.argv[1]))
