from enum import Enum
from typing import Optional

class Sector(Enum):
    FINANCIAL_SERVICES = "Financial Services"
    BASIC_MATERIALS = "Basic Materials"
    REAL_ESTATE = "Real Estate"
    CONSUMER_DEFENSIVE = "Consumer Defensive"
    INDUSTRIALS = "Industrials"
    HEALTHCARE = "Healthcare"
    CONSUMER_CYCLICAL = "Consumer Cyclical"
    COMMUNICATION_SERVICES = "Communication Services"
    ENERGY = "Energy"
    TECHNOLOGY = "Technology"
    UTILITIES = "Utilities"


industry = [
    "Gold",
    "Household & Personal Products",
    
]

def build_metadata_filter(
    country: str = None, 
    sector: Optional[Sector] = None, 
    country_not: str = None, 
    sector_not: str = None,
    # marketCap_gt: float = None,
    # marketCap_lt: float = None,
    # returnOnAssets_gt: float = None,
    # returnOnEquity_gt: float = None,
    # revenueGrowth_gt: float = None,
    # earningsGrowth_gt: float = None,
    # freeCashflow_gt: float = None
) -> dict:
    """
    Builds a metadata filter based on the provided parameters.

    Args:
        country (str, optional): Country to match (Yahoo Finance property: 'country'). Must be the full and original country name, no abbreviations, ex. don't use USA use United States.
        sector (Sector, optional): Sector to match (Yahoo Finance property: 'sector'). You can match from the enum contextually, and select one according to the context
        country_not (str, optional): Country to exclude (Yahoo Finance property: 'country'). Must be the full and original country name, no abbreviations ex. don't use USA use United States.
        sector_not (str, optional): Sector to exclude (Yahoo Finance property: 'sector'). You can match from the enum contextually, and select one according to the context

    Returns:
        dict: Metadata filter.
    """
    
    """
    marketCap_gt (float, optional): Market capitalization greater than filter (Yahoo Finance property: 'marketCap').
    marketCap_lt (float, optional): Market capitalization less than filter (Yahoo Finance property: 'marketCap').
    returnOnAssets_gt (float, optional): Return on assets greater than filter (Yahoo Finance property: 'returnOnAssets').
    returnOnEquity_gt (float, optional): Return on equity greater than filter (Yahoo Finance property: 'returnOnEquity').
    revenueGrowth_gt (float, optional): Revenue growth greater than filter (Yahoo Finance property: 'revenueGrowth').
    earningsGrowth_gt (float, optional): Earnings growth greater than filter (Yahoo Finance property: 'earningsGrowth').
    freeCashflow_gt (float, optional): Free cash flow greater than filter (Yahoo Finance property: 'freeCashflow').
    """
    metadata_filter = {}

    if country:
        metadata_filter['country'] = {'$eq': country}
    if sector:
        metadata_filter['sector'] = {'$eq': sector}
    if country_not:
        metadata_filter['country'] = {'$ne': country_not}
    if sector_not:
        metadata_filter['sector'] = {'$ne': sector_not}

    # if marketCap_gt is not None:
    #     metadata_filter['marketCap'] = {'$gt': marketCap_gt}
    # if marketCap_lt is not None:
    #     metadata_filter['marketCap'] = {'$lt': marketCap_lt}

    # if returnOnAssets_gt is not None:
    #     metadata_filter['returnOnAssets'] = {'$gt': returnOnAssets_gt}
    
    # if returnOnEquity_gt is not None:
    #     metadata_filter['returnOnEquity'] = {'$gt': returnOnEquity_gt}
    
    # if revenueGrowth_gt is not None:
    #     metadata_filter['revenueGrowth'] = {'$gt': revenueGrowth_gt}
    
    # if earningsGrowth_gt is not None:
    #     metadata_filter['earningsGrowth'] = {'$gt': earningsGrowth_gt}
    
    # if freeCashflow_gt is not None:
    #     metadata_filter['freeCashflow'] = {'$gt': freeCashflow_gt}

    return metadata_filter
