from langgraph.prebuilt import create_react_agent
from agent.prompts import SYSTEM_PROMPT

from agent.model import llm
from agent.tools import (
    retrieve_documents,
    list_documents,
    summarize_document,
    remove_document,
    web_search,
    find_document,
)

agent = create_react_agent(
    model=llm,
     prompt=SYSTEM_PROMPT,
    tools=[
        retrieve_documents,
        list_documents,
        summarize_document,
        remove_document,
        web_search,
        find_document,
    ],
     
)