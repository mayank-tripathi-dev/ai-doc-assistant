from langgraph.prebuilt import create_react_agent

from agent.model import llm
from agent.tools import (
    retrieve_documents,
    list_documents,
)

agent = create_react_agent(
    model=llm,
    tools=[
        retrieve_documents,
        list_documents,
    ],
)