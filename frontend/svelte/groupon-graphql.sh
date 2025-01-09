# bin/sh

## deal catalog
## https://deal-catalog.production.service.us-central1.gcp.groupondev.com/deal_catalog/v2/deals/ffc5a0fc-9e9d-438c-a181-9898d1bbd3ef?clientId=4f971f58e9062232-dealestate

## timeout
## https://deal-catalog.production.service.us-central1.gcp.groupondev.com/deal_catalog/v2/deals/search?distributionRegionCodes=us&clientId=30f50f7fa4fa466a-seo

## active deals in US
## https://deal-catalog.production.service.us-central1.gcp.groupondev.com/deal_catalog/v2/deals/active?distributionRegionCodes=US&clientId=30f50f7fa4fa466a-seo

#curl -k --verbose https://edge-proxy--production--default.prod.us-central1.gcp.groupondev.com/deal_catalog/v2/deals/search?clientId=deal-estate --header "Host: deal-catalog.production.service"
#curl -k --verbose https://edge-proxy--production--default.prod.us-central1.gcp.groupondev.com/heartbeat.txt --header "Host: deal-catalog.production.service" --header "g-hb-upstream-deal-catalog: us-central1--default--conveyor-gcp-production2"
# curl 'https://www.groupon.com/mobilenextapi/graphql' \
#     -H 'accept: application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
#     -H 'accept-language: cs-CZ,cs;q=0.9,en;q=0.8,pl;q=0.7' \
#     -H 'cache-control: no-cache' \
#     -H 'content-type: application/json' \
#     -H 'cookie: __attentive_cco=1733152003029; __attentive_ss_referrer=ORGANIC; sliguid=187192ee-4f88-4f53-841a-9341c10d4304; slirequested=true; RoktRecogniser=f703a7af-0256-4634-9228-0399ded1ea1b; __attentive_dv=1; _attn_=eyJ1Ijoie1wiY29cIjoxNzM0NDM0NDgzNTg4LFwidW9cIjoxNzM0NDM0NDgzNTg4LFwibWFcIjoyMTkwMCxcImluXCI6ZmFsc2UsXCJ2YWxcIjpcIjE4MjU3ODlkODcxYzQ4OWNiZGEwY2M3NmNjOWUwNmQ4XCJ9In0=; __attentive_id=1825789d871c489cbda0cc76cc9e06d8; division=chicago; user_locale=en_US; _gcl_au=1.1.858812116.1736172767; initialTrafficSource=utmcsr=doorman-staging-na.groupondev.com|utmcmd=referral|utmccn=(not set); __utmzzses=1; gx=next_ramp_up:treatment; ell=41.88%2C-87.624; division_name=Chicago; location_history_present=1; hide_sub_banner-session_check=1; __Host-next-auth.csrf-token=467dd912e21f8461ad1528b5fbb036d590fb7e53ad6b4dacb5241d8a81b56525%7C3556c4eb4e2df24ef2036a6fe91464dac9527d91ce8e2c0a7b757bcc2f24f9b7; __Secure-next-auth.callback-url=https%3A%2F%2Fwww.groupon.com; cjConsent=MHxZfDB8Tnww; _li_dcdm_c=.groupon.com; _lc2_fpi=7736fb274e4b--01jfa5krrkxhaqqnb5bzx0394x; _fbp=fb.1.1736178598982.115395884105109115; addshoppers.com=2%7C1%3A0%7C10%3A1736178599%7C15%3Aaddshoppers.com%7C44%3ANjdhMzY1ZWVmMmYzNDk4NzhkYTVkNjU0Zjk3YTRlOTA%3D%7C18d1739d546f47f55fa10edf86084e4db69b8a7bdb6e123a53a7f2432f33929a; hide_sub_banner=minimized; hide_sub_banner-session_count=0; meiro_user_id_js=850496f9-fc08-4327-8494-2fd3b05d539a; meiro_session_id_js=MTczNjI0MzE5MDQ5NiY4NTA0OTZmOS1mYzA4LTQzMjctODQ5NC0yZmQzYjA1ZDUzOWE=; meiro_user_id=850496f9-fc08-4327-8494-2fd3b05d539a; meiro_session_id_used_ts_js=1736243191500; meiro_synced_ga_cid=1665151319.1736178599; meiro_synced_fb_cid=1736178598982.115395884105109115; __ssid=582be739b94aa28130b910b4575e689; _hjSessionUser_2551481=eyJpZCI6IjliYzQ1ZWM4LTIwNzAtNWM5Mi05ZWRmLTU5MDYzMDQ5MjNjNCIsImNyZWF0ZWQiOjE3MzYyNDMxOTIzMDMsImV4aXN0aW5nIjpmYWxzZX0=; _ga_HBQZVQRHKX=GS1.1.1736243192.1.0.1736243200.0.0.0; mc_mid=mike-s-cafe-1598908740; s=f5b6a29c-41ab-4aaa-b6a2-9c41ab4aaa1f; mci=2025-01-09T11%3A55%3A47.641Z; authToken=eyJ2ZXJzaW9uIjoxLCJkYXRhIjp7InV1aWQiOiI5MWJjZGE4OC1kYzgxLTExZWUtOTIwZC1kZTViMmJmMjAxMGEiLCJtZXRob2RzIjp7Im9rdGEiOjE3MzY0MjM3NDd9fSwia2V5Ijo3ODcwNjgsInNpZ25hdHVyZSI6Ik1FWUNJUUNMaXFFRU5oV01uK1E5cnk1QnA2QktNQkNOQklyT0ZncXE0ZGl2Ukh2NXpnSWhBSnRTM3BUdHNXZnJndTBWcnA2U0piaVZ0YmxVMWl4bnB5TnM2WkQ4ZVpDZyJ9; b=a75d408d-6bfc-a924-ba16-a41f3d4d5ff0; bucket=867; bm_mi=822AD14188379300E69ED5A06CE57E8F~YAAQ55rYF8Awt0mUAQAAHL3rShqL+Dy5UU/G5LSBw5mV6ZZEKKeVd3hHq3BEcEdZsHLApLZZEeW3M5a3ypzInP1o3pjm7/Ij+A7if52QwL9g/B2u4DGScpYNau6p4QsXvU8oV/xcK5Ch5bmWFOo2kfHM05HQw1XHs6WEB9zmB0lTUTSKBHYQgl/z1GjFDuHRZRTSg0tc4DXj00Arh/kbIfTwvvKHgxiV3qXQC2kFP9aXf8PmEtxoBtdlBZ7VvCzZYlR8QOQwKkzHlBeYoQVgeTcQwjKJU3dli0WAHfqc2YxXbcPAeqMNKs4w6dWnz5U5uv9C2dleuoA1/9TKcQ==~1; _clck=1k1yz4o%7C2%7Cfsf%7C0%7C1832; _clsk=o7fyl%7C1736423775138%7C5%7C1%7Cs.clarity.ms%2Fcollect; bh-last-page-id=f5b6a29c-41ab-4aaa-b6a2-9c41ab4aaa1f-1736423773177-TH0; sigFraudCheck=63bbb01c-a55b-4310-bbb0-1ca55be31065; bh-last-event-id=f5b6a29c-41ab-4aaa-b6a2-9c41ab4aaa1f-1736423804930-0; ipll=%7B%22lat%22%3A50.0471%2C%22lng%22%3A14.4523%2C%22ip%22%3A%22194.228.24.218%22%2C%22country%22%3A%22CZ%22%2C%22city%22%3A%22Prague%22%2C%22state%22%3A%22Prague%22%7D; ak_bmsc=5AC4D7D2C89A039332669291BED00E31~000000000000000000000000000000~YAAQDrATAlSBc9iTAQAAHPP0ShoXayiD6GxxWKTZrQh/CRaCDpL6WXdd1WHXileV7vIZp8JhGIk0lCpUZwZlj1eKjR4T2GJBd73dFO+PbE5xpGtvvtGSnUmaA/pXRTKxxV6FbVWX7c1ybVTANkB/tNwtoMZYYy63YHW1IHBOLv2xWkHp9QVWhPrWC/rbFAFvymex/yBLNEMvxbobr1xQDqARAtsLkqhc81eT46uHF74xCb9zu5TnaHfHq2/4tYA8eAj55qttRdNJyXpb0ZBxieXy2H7yTtDciCDAfO0vzxvUAgxmWWHUJ0YEmYBRoBBSC09RvBsvHEStgPDlCvt2SrzxNw0G2ZIM3kR4XmpyBhIsn+UAO3O92mN12+OjkQUqzmI4LEWfK3cwKRsIMrHO+pKk61K2OPSwPwvBtfTlHAFOf91DxevLZp0NzxhcIzIUaI0kDw8HZ2lk2tIRHJPvgSi8qyd/MDngRx7/oRxowJqK2ASYSCab2227lzddsfJ5Nyq1+nNp0Lf/UWwrrvscvEfeeKV0Tj//bJUs80w7nSPFhOLi9Ou903yVRBjV59/ddqL3H690ovosvQrv6bwlB30U0CTg; bm_sz=72D25F20F21B9EC2718844D1A6F08CA0~YAAQDrATAlWBc9iTAQAAHPP0Shp25Wkj+6ABVhGzCSJCX4scVDt2GaAvomJi8WcNZfQXH7v8oaJiuPACbxNF/PQBuBOwxMj1QvMLOv8d46Xub2gxr2eVwnFU0UAhxgjn6c8sbHVyM9Ns0ShNtmCdTigompIsV1X+8V9sugJe8nQUj1Q/HT20DldipQ2SCMlS8Tq8ElSGuPnLtVSoMdAWnwraQiXGpo9CsoH0pL4piy/CvHbs8u4G8gQyDZNtQqXRsvBcibzcme0BxgpGQg/DKXge+93RZW2xeA/8hXFjIHQm2mdPiuBWa8FmCabmukpKBgMOGl8Jljgk9JEj/XLB6c06HF5wQImpqcN7LpqpFm4PhHw5+Q5uoM7RVFwdWJpjDBc2nHNx+eSC4g5HlJm9wQ==~3551794~4539445; _abck=468C41CD3551FBAD87A47867E1808AE2~0~YAAQDrATAl+Bc9iTAQAAy/T0Sg2hJsDtI1m7EIqMDELqlGwTOR3z+Xx1KhLvUqITKO68dmqctwuguXJfc0A6mJX7fY/azUR1Rtc3p/wUQBkmWoZjvn4Ht6etl8LXBJINhvy2HWoXVMnruwt0SKrHhjU7S6untTZxSWc+YQoAabhAOq3yr8DSDsSNzZCPqH1UzqSHW2k3AapWAYyCYM7l3wt1AzDy8nh0WRcaedZz3z0VCOAZ8BS53MXzz93a3KTeg57/TqE1vLiQjclvN1DNQ+4HppvzTq06kCUETKRyj6JD8he4vqp1LOP14IX71+6dHgqwQa/L7BMb+Fyzf20LKqmHMfZ9PLMihaBmYg6+WlobX6r0hOn6+eijKUXza2LtUl9r1t0KkM8Zqau9BoExpDGN530jeUbiHseufFT+M59+ZefpGU5fucDnzRkXCblqL8BUvxxG+OEECPjAcoJpqJS5WVBJUv2j1TEmaONvqMhVvKWjMjleYffUNWg=~-1~-1~-1; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..AzVe-f_iEXofUyQy.w6Lv70-Z7SpvOe94E944ttF1eSNEiXtAQwRoe6IP3zwet1Urki1gFJibHM7_w4ixERUHO35Bw0BKsXoYN1JzAxjc1oWSLHXHuqTPY8SB6btzBKTKpvqEXigk0zjqrnFI1FzRVEmhuAaII0u_cLSU1CP66IBF-hKNGYp_IXHtM8zUlMRh6e0KmkCfw7zqi0s45Epx7a3YVV-rdR2z9Bj3COVeRvKfvRxnvQl9Jyj7VGXY-l1OIOaM-AnhRzBtN_8z-BBVYzXw1YJv4lff_odxhkBR2tJdE4UKLnju-pYEiDAzpnQX_6tBji3sFm3-QsuorwIxwbDNuzKWTCg9NmhGrmkggSNzcJ321x_MrGsV.CEu59BXuibZQhyLGjig2Ug; s=f5b6a29c-41ab-4aaa-b6a2-9c41ab4aaa1f; db_ui=0c1125f6-da47-b1e3-ced8-95d0ae2db9f7; _ga=GA1.1.581595193.1736424356; FPGSID=1.1736424356.1736424356.G-TW2CBMFZ20.l-w9qeRB7GxhIrkNvsyo7g; cto_bundle=pOHKwV9jdmxsQ1FSU2xON3IxZmE1JTJGJTJCZXElMkY1WGs4ZFlJanRZQ1k4M3Fmb0hjTkYwbGpEQUJPdENKRFZHUzZmalJ2cGZPc3M0b0ZLd3Eyd0slMkJ4ZldGQlF0cXp2SVdUSTJJMTdUTG5XcGV6eHNmTmZNcFZmSnF0WUlrdWNHUEhjUjBPVll6cThXZDlSWFRpZ2NIVDJhNjk5eVU3Z3VzOGk1TkUlMkYyQlJNVXhlNWh3Qk5tWE44cGFRaHB6MlJsNlUlMkZ0cjZHRjg; g_state={"i_p":1736431560902,"i_l":1}; bh-last-page-id=f5b6a29c-41ab-4aaa-b6a2-9c41ab4aaa1f-1736424369372-TH0; _ga_TW2CBMFZ20=GS1.1.1736424355.1.1.1736424369.0.0.352161566; __attentive_pv=47' \
#     -H 'origin: https://www.groupon.com' \
#     -H 'pragma: no-cache' \
#     -H 'sec-ch-ua: "Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"' \
#     -H 'sec-ch-ua-mobile: ?0' \
#     -H 'sec-ch-ua-platform: "macOS"' \
#     -H 'sec-fetch-dest: empty' \
#     -H 'sec-fetch-mode: cors' \
#     -H 'sec-fetch-site: same-origin' \
#     -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' \
#     -H 'x-country: US' \
#     -H 'x-grpn-experiment-overrides: undefined' \
#     -H 'x-grpn-feature-overrides: undefined' \
#     -H 'x-mbnxt-gql-source: client' \
#     --data-raw $'[{"operationName":"getHomepageV2DealFeed","variables":{"dealFeedParams":{"limit":18,"division":"chicago","pageName":"homepage","pageType":"homepage_all","filters":[{"key":"exclude_deals","values":[]}]}},"query":"query getHomepageV2DealFeed($dealFeedParams: DealFeedInput\u0021) {\\n  queryDealFeed(params: $dealFeedParams) {\\n    cards {\\n      ...StandardDealCardFragment\\n      __typename\\n    }\\n    pagination {\\n      offset\\n      nextOffset\\n      feedToken\\n      totalCount\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment StandardDealCardFragment on StandardDealCard {\\n  id\\n  uuid\\n  optionId\\n  url\\n  title\\n  adId\\n  prices {\\n    price {\\n      ...StandardPriceFragment\\n      __typename\\n    }\\n    strikeThroughPrice {\\n      ...StandardPriceFragment\\n      __typename\\n    }\\n    limitedSalePrice {\\n      ...StandardPriceFragment\\n      __typename\\n    }\\n    totalPrice {\\n      cheapestOptionId\\n      cheapestOptionTitle\\n      numOfNights\\n      price {\\n        ...StandardPriceFragment\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  displayOptions {\\n    ...DisplayOptionsFragment\\n    __typename\\n  }\\n  merchant {\\n    name\\n    rating\\n    __typename\\n  }\\n  promotion {\\n    promoCode\\n    priceString\\n    expiration\\n    __typename\\n  }\\n  imageUrls {\\n    small\\n    medium\\n    large\\n    __typename\\n  }\\n  rating {\\n    value\\n    count\\n    __typename\\n  }\\n  badges {\\n    badgeType\\n    displayText\\n    iconImageUrl\\n    __typename\\n  }\\n  discountPercentage\\n  locationsSummary {\\n    total\\n    closest {\\n      lat\\n      lng\\n      address\\n      name\\n      __typename\\n    }\\n    __typename\\n  }\\n  isSupportedByMbnxt\\n  isStartingPrice\\n  icon\\n  flags {\\n    isGetawaysBookableDeal\\n    isGetawaysDeal\\n    __typename\\n  }\\n  invalidateAt\\n  __typename\\n}\\n\\nfragment StandardPriceFragment on StandardPrice {\\n  formatted {\\n    ...FormattedPriceItemFragment\\n    __typename\\n  }\\n  amount\\n  currencyCode\\n  currencyExponent\\n  includedFees\\n  __typename\\n}\\n\\nfragment FormattedPriceItemFragment on FormattedPriceItem {\\n  alignTop\\n  value\\n  strikeThrough\\n  small\\n  bold\\n  fontSmall\\n  fontXSmall\\n  hideable\\n  __typename\\n}\\n\\nfragment DisplayOptionsFragment on StandardDisplayOptions {\\n  discountEnabled\\n  showDiscountPercentageBadge\\n  showRedemptionLocations\\n  showPrice\\n  timerEnabled\\n  quantityEnabled\\n  merchandisingType\\n  hidePriceOnLoggedOut\\n  __typename\\n}"}]'

# get deal by ID or permalink
curl 'https://www.groupon.com/mobilenextapi/graphql' \
    -H 'accept: application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
    -H 'accept-language: cs-CZ,cs;q=0.9,en;q=0.8,pl;q=0.7' \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -H 'cookie: __attentive_cco=1733152003029; __attentive_ss_referrer=ORGANIC; sliguid=187192ee-4f88-4f53-841a-9341c10d4304; slirequested=true; RoktRecogniser=f703a7af-0256-4634-9228-0399ded1ea1b; __attentive_dv=1; _attn_=eyJ1Ijoie1wiY29cIjoxNzM0NDM0NDgzNTg4LFwidW9cIjoxNzM0NDM0NDgzNTg4LFwibWFcIjoyMTkwMCxcImluXCI6ZmFsc2UsXCJ2YWxcIjpcIjE4MjU3ODlkODcxYzQ4OWNiZGEwY2M3NmNjOWUwNmQ4XCJ9In0=; __attentive_id=1825789d871c489cbda0cc76cc9e06d8; division=chicago; user_locale=en_US; _gcl_au=1.1.858812116.1736172767; initialTrafficSource=utmcsr=doorman-staging-na.groupondev.com|utmcmd=referral|utmccn=(not set); __utmzzses=1; gx=next_ramp_up:treatment; ell=41.88%2C-87.624; division_name=Chicago; location_history_present=1; hide_sub_banner-session_check=1; __Host-next-auth.csrf-token=467dd912e21f8461ad1528b5fbb036d590fb7e53ad6b4dacb5241d8a81b56525%7C3556c4eb4e2df24ef2036a6fe91464dac9527d91ce8e2c0a7b757bcc2f24f9b7; __Secure-next-auth.callback-url=https%3A%2F%2Fwww.groupon.com; cjConsent=MHxZfDB8Tnww; _li_dcdm_c=.groupon.com; _lc2_fpi=7736fb274e4b--01jfa5krrkxhaqqnb5bzx0394x; _fbp=fb.1.1736178598982.115395884105109115; addshoppers.com=2%7C1%3A0%7C10%3A1736178599%7C15%3Aaddshoppers.com%7C44%3ANjdhMzY1ZWVmMmYzNDk4NzhkYTVkNjU0Zjk3YTRlOTA%3D%7C18d1739d546f47f55fa10edf86084e4db69b8a7bdb6e123a53a7f2432f33929a; hide_sub_banner=minimized; hide_sub_banner-session_count=0; meiro_user_id_js=850496f9-fc08-4327-8494-2fd3b05d539a; meiro_session_id_js=MTczNjI0MzE5MDQ5NiY4NTA0OTZmOS1mYzA4LTQzMjctODQ5NC0yZmQzYjA1ZDUzOWE=; meiro_user_id=850496f9-fc08-4327-8494-2fd3b05d539a; meiro_session_id_used_ts_js=1736243191500; meiro_synced_ga_cid=1665151319.1736178599; meiro_synced_fb_cid=1736178598982.115395884105109115; __ssid=582be739b94aa28130b910b4575e689; _hjSessionUser_2551481=eyJpZCI6IjliYzQ1ZWM4LTIwNzAtNWM5Mi05ZWRmLTU5MDYzMDQ5MjNjNCIsImNyZWF0ZWQiOjE3MzYyNDMxOTIzMDMsImV4aXN0aW5nIjpmYWxzZX0=; _ga_HBQZVQRHKX=GS1.1.1736243192.1.0.1736243200.0.0.0; mc_mid=mike-s-cafe-1598908740; mci=2025-01-09T11%3A55%3A47.641Z; authToken=eyJ2ZXJzaW9uIjoxLCJkYXRhIjp7InV1aWQiOiI5MWJjZGE4OC1kYzgxLTExZWUtOTIwZC1kZTViMmJmMjAxMGEiLCJtZXRob2RzIjp7Im9rdGEiOjE3MzY0MjM3NDd9fSwia2V5Ijo3ODcwNjgsInNpZ25hdHVyZSI6Ik1FWUNJUUNMaXFFRU5oV01uK1E5cnk1QnA2QktNQkNOQklyT0ZncXE0ZGl2Ukh2NXpnSWhBSnRTM3BUdHNXZnJndTBWcnA2U0piaVZ0YmxVMWl4bnB5TnM2WkQ4ZVpDZyJ9; b=a75d408d-6bfc-a924-ba16-a41f3d4d5ff0; bucket=867; bm_mi=822AD14188379300E69ED5A06CE57E8F~YAAQ55rYF8Awt0mUAQAAHL3rShqL+Dy5UU/G5LSBw5mV6ZZEKKeVd3hHq3BEcEdZsHLApLZZEeW3M5a3ypzInP1o3pjm7/Ij+A7if52QwL9g/B2u4DGScpYNau6p4QsXvU8oV/xcK5Ch5bmWFOo2kfHM05HQw1XHs6WEB9zmB0lTUTSKBHYQgl/z1GjFDuHRZRTSg0tc4DXj00Arh/kbIfTwvvKHgxiV3qXQC2kFP9aXf8PmEtxoBtdlBZ7VvCzZYlR8QOQwKkzHlBeYoQVgeTcQwjKJU3dli0WAHfqc2YxXbcPAeqMNKs4w6dWnz5U5uv9C2dleuoA1/9TKcQ==~1; _clck=1k1yz4o%7C2%7Cfsf%7C0%7C1832; _clsk=o7fyl%7C1736423775138%7C5%7C1%7Cs.clarity.ms%2Fcollect; bh-last-page-id=f5b6a29c-41ab-4aaa-b6a2-9c41ab4aaa1f-1736423773177-TH0; sigFraudCheck=63bbb01c-a55b-4310-bbb0-1ca55be31065; bh-last-event-id=f5b6a29c-41ab-4aaa-b6a2-9c41ab4aaa1f-1736423804930-0; ipll=%7B%22lat%22%3A50.0471%2C%22lng%22%3A14.4523%2C%22ip%22%3A%22194.228.24.218%22%2C%22country%22%3A%22CZ%22%2C%22city%22%3A%22Prague%22%2C%22state%22%3A%22Prague%22%7D; ak_bmsc=5AC4D7D2C89A039332669291BED00E31~000000000000000000000000000000~YAAQDrATAlSBc9iTAQAAHPP0ShoXayiD6GxxWKTZrQh/CRaCDpL6WXdd1WHXileV7vIZp8JhGIk0lCpUZwZlj1eKjR4T2GJBd73dFO+PbE5xpGtvvtGSnUmaA/pXRTKxxV6FbVWX7c1ybVTANkB/tNwtoMZYYy63YHW1IHBOLv2xWkHp9QVWhPrWC/rbFAFvymex/yBLNEMvxbobr1xQDqARAtsLkqhc81eT46uHF74xCb9zu5TnaHfHq2/4tYA8eAj55qttRdNJyXpb0ZBxieXy2H7yTtDciCDAfO0vzxvUAgxmWWHUJ0YEmYBRoBBSC09RvBsvHEStgPDlCvt2SrzxNw0G2ZIM3kR4XmpyBhIsn+UAO3O92mN12+OjkQUqzmI4LEWfK3cwKRsIMrHO+pKk61K2OPSwPwvBtfTlHAFOf91DxevLZp0NzxhcIzIUaI0kDw8HZ2lk2tIRHJPvgSi8qyd/MDngRx7/oRxowJqK2ASYSCab2227lzddsfJ5Nyq1+nNp0Lf/UWwrrvscvEfeeKV0Tj//bJUs80w7nSPFhOLi9Ou903yVRBjV59/ddqL3H690ovosvQrv6bwlB30U0CTg; bm_sz=72D25F20F21B9EC2718844D1A6F08CA0~YAAQDrATAlWBc9iTAQAAHPP0Shp25Wkj+6ABVhGzCSJCX4scVDt2GaAvomJi8WcNZfQXH7v8oaJiuPACbxNF/PQBuBOwxMj1QvMLOv8d46Xub2gxr2eVwnFU0UAhxgjn6c8sbHVyM9Ns0ShNtmCdTigompIsV1X+8V9sugJe8nQUj1Q/HT20DldipQ2SCMlS8Tq8ElSGuPnLtVSoMdAWnwraQiXGpo9CsoH0pL4piy/CvHbs8u4G8gQyDZNtQqXRsvBcibzcme0BxgpGQg/DKXge+93RZW2xeA/8hXFjIHQm2mdPiuBWa8FmCabmukpKBgMOGl8Jljgk9JEj/XLB6c06HF5wQImpqcN7LpqpFm4PhHw5+Q5uoM7RVFwdWJpjDBc2nHNx+eSC4g5HlJm9wQ==~3551794~4539445; _abck=468C41CD3551FBAD87A47867E1808AE2~0~YAAQDrATAl+Bc9iTAQAAy/T0Sg2hJsDtI1m7EIqMDELqlGwTOR3z+Xx1KhLvUqITKO68dmqctwuguXJfc0A6mJX7fY/azUR1Rtc3p/wUQBkmWoZjvn4Ht6etl8LXBJINhvy2HWoXVMnruwt0SKrHhjU7S6untTZxSWc+YQoAabhAOq3yr8DSDsSNzZCPqH1UzqSHW2k3AapWAYyCYM7l3wt1AzDy8nh0WRcaedZz3z0VCOAZ8BS53MXzz93a3KTeg57/TqE1vLiQjclvN1DNQ+4HppvzTq06kCUETKRyj6JD8he4vqp1LOP14IX71+6dHgqwQa/L7BMb+Fyzf20LKqmHMfZ9PLMihaBmYg6+WlobX6r0hOn6+eijKUXza2LtUl9r1t0KkM8Zqau9BoExpDGN530jeUbiHseufFT+M59+ZefpGU5fucDnzRkXCblqL8BUvxxG+OEECPjAcoJpqJS5WVBJUv2j1TEmaONvqMhVvKWjMjleYffUNWg=~-1~-1~-1; s=f5b6a29c-41ab-4aaa-b6a2-9c41ab4aaa1f; db_ui=0c1125f6-da47-b1e3-ced8-95d0ae2db9f7; _ga=GA1.1.581595193.1736424356; cto_bundle=pOHKwV9jdmxsQ1FSU2xON3IxZmE1JTJGJTJCZXElMkY1WGs4ZFlJanRZQ1k4M3Fmb0hjTkYwbGpEQUJPdENKRFZHUzZmalJ2cGZPc3M0b0ZLd3Eyd0slMkJ4ZldGQlF0cXp2SVdUSTJJMTdUTG5XcGV6eHNmTmZNcFZmSnF0WUlrdWNHUEhjUjBPVll6cThXZDlSWFRpZ2NIVDJhNjk5eVU3Z3VzOGk1TkUlMkYyQlJNVXhlNWh3Qk5tWE44cGFRaHB6MlJsNlUlMkZ0cjZHRjg; g_state={"i_p":1736431560902,"i_l":1}; exit_modal_opened_timestamp=2025-01-09T12%3A07%3A39.513Z; s=f5b6a29c-41ab-4aaa-b6a2-9c41ab4aaa1f; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..FiB4GY8V1FuAa9PK.tmeb2XM9yuysgp13rIZV60JHgwA7KwEmzBS6sGrai5RA7cCUSRl5jEnd9wfa7NYpwg2NtyDHsLPC4A0ncovCP4-J_3Mo-qz9TOdtHYELcXzOTfS3eGz9TCO3217SFbZSvSbJjG3wTF3aKM5zPdCjBh4ifrKysR7awlQ1C9UIgmq5BVxVDgrRuD3yIY_dMGYtmjjkyZvOtzJwBgUKmqHpm4jxenKuwzC1rL8m3qCzuRWWa4qC-ggwCXdl2sDWD3qln_SmDQomAFLRV0MN16SjHqifA0nK6V7QkNMQ_-6V197-hA_F9dsaGsRJ9V0nC7Em384_dhh10MPAjnLOaJ0mdM8eJ2icpQXRADT7UR0I.7jRO6BzUnFl7l0oJQnGGhw; _ga_TW2CBMFZ20=GS1.1.1736426749.2.0.1736426749.0.0.1216013643; mbnxt_last_seen_deal_ids=%5B%22heavenly-massage-12%22%5D; FPGSID=1.1736426749.1736426749.G-TW2CBMFZ20.1RhKMBVSJRbtTcj-5hAeJg; bh-last-page-id=f5b6a29c-41ab-4aaa-b6a2-9c41ab4aaa1f-1736426749739-TH0' \
    -H 'origin: https://www.groupon.com' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' \
    -H 'x-country: US' \
    -H 'x-mbnxt-gql-source: client' \
    --data-raw $'[{"operationName":"getDeal","variables":{"dealId":"0000286a-c974-4fb7-bc84-9aaaefd522ce","optionId":null},"query":"query getDeal($dealId: String\u0021, $optionId: String, $adSafe: Boolean) {\\n  getDeal(id: $dealId, optionId: $optionId, adSafe: $adSafe) {\\n    ...WishlistableDealFragment\\n    id\\n    uuid\\n    dealUrl\\n    canRenderMbnxt\\n    showGrouponGuarantee\\n    showTaxesText\\n    showGliveLogo\\n    title\\n    subtitle\\n    seoTitle\\n    seodata {\\n      noindex\\n      redirectUrl\\n      __typename\\n    }\\n    status\\n    mainDealType\\n    overlayDetails {\\n      title\\n      detailsHtml\\n      __typename\\n    }\\n    badges {\\n      badgeType\\n      text\\n      iconUrl\\n      __typename\\n    }\\n    adSlots {\\n      id\\n      sizes\\n      path\\n      slot\\n      device\\n      __typename\\n    }\\n    specificAttributes {\\n      reservationsHtml\\n      travelersTipsHtml\\n      howToGetThereHtml\\n      whatYouGetHtml\\n      amenitiesHtml\\n      __typename\\n    }\\n    flags {\\n      isGoodsDeal\\n      isGiftable\\n      isTravelDeal\\n      isGetawaysDeal\\n      isGetawaysBookableDeal\\n      isCoupon\\n      isClo\\n      isG1G2\\n      isGlive\\n      is3Pip\\n      isHotelDeal\\n      isGrouponGiftCard\\n      isUITreatmentEmpty\\n      isMerchantNameInTitle\\n      isBookable\\n      __typename\\n    }\\n    images {\\n      ...ImageFragment\\n      __typename\\n    }\\n    videos {\\n      youtubeId\\n      thumbnailUrl\\n      url\\n      __typename\\n    }\\n    reels {\\n      url\\n      __typename\\n    }\\n    aboutDealHtml\\n    finePrintHtml\\n    highlightsHtml\\n    categorizations {\\n      ...CategorizationFragment\\n      children {\\n        ...CategorizationFragment\\n        children {\\n          ...CategorizationFragment\\n          children {\\n            ...CategorizationFragment\\n            children {\\n              ...CategorizationFragment\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    division {\\n      id\\n      timezoneIdentifier\\n      timezoneOffsetInSeconds\\n      __typename\\n    }\\n    merchant {\\n      id\\n      uuid\\n      aboutHtml\\n      name\\n      recommendations {\\n        rating\\n        totalMessage\\n        total\\n        __typename\\n      }\\n      aspects {\\n        id\\n        text\\n        frequency\\n        __typename\\n      }\\n      websiteUrl\\n      __typename\\n    }\\n    grouponRating\\n    soldQuantityMessage\\n    options {\\n      ...DealOptionFragment\\n      __typename\\n    }\\n    isWishlisted\\n    customerReviews {\\n      items {\\n        id\\n        createdAt\\n        rating\\n        text\\n        user {\\n          id\\n          name\\n          badges\\n          ratingCount\\n          reviewCount\\n          __typename\\n        }\\n        icons\\n        __typename\\n      }\\n      __typename\\n    }\\n    tripadvisorReviews {\\n      ...TripadvisorReviewsFragment\\n      __typename\\n    }\\n    shareLinks {\\n      ...ShareLinkFragment\\n      __typename\\n    }\\n    breadcrumbs {\\n      id\\n      title\\n      url\\n      __typename\\n    }\\n    redemptionLocations {\\n      id\\n      lat\\n      lng\\n      state\\n      ...Deal_LocationDetails_RedemptionLocation\\n      __typename\\n    }\\n    amenities {\\n      name\\n      iconUrl\\n      available\\n      __typename\\n    }\\n    traits {\\n      ...TraitFragment\\n      __typename\\n    }\\n    endsIn {\\n      endsAtIso\\n      __typename\\n    }\\n    hasPromotion\\n    hidePrice\\n    categoryShortcuts {\\n      id\\n      title: friendlyName\\n      url\\n      __typename\\n    }\\n    currentCategory {\\n      id\\n      type\\n      title\\n      url\\n      topcategory\\n      __typename\\n    }\\n    cancellationPolicy {\\n      title\\n      description\\n      isCancellable\\n      __typename\\n    }\\n    displayOptions {\\n      discountEnabled\\n      showRedemptionLocations\\n      quantityEnabled\\n      __typename\\n    }\\n    hasTimer\\n    __typename\\n  }\\n}\\n\\nfragment WishlistableDealFragment on WishlistableDeal {\\n  id\\n  uuid\\n  title\\n  dealUrl\\n  canRenderMbnxt\\n  categorizations {\\n    ...WishlistableDealCategorizationFragment\\n    __typename\\n  }\\n  options {\\n    id\\n    redemptionLocations {\\n      city\\n      state\\n      country\\n      __typename\\n    }\\n    __typename\\n  }\\n  price {\\n    value\\n    alignTop\\n    small\\n    __typename\\n  }\\n  merchant {\\n    id\\n    name\\n    __typename\\n  }\\n  division {\\n    id\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment WishlistableDealCategorizationFragment on Categorizations {\\n  id\\n  children {\\n    id\\n    children {\\n      id\\n      children {\\n        id\\n        children {\\n          id\\n          children {\\n            id\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ImageFragment on DealImage {\\n  imgFallbackUrls {\\n    minWidth\\n    maxWidth\\n    srcSetUrls\\n    type\\n    url\\n    __typename\\n  }\\n  sourceUrls {\\n    minWidth\\n    maxWidth\\n    srcSetUrls\\n    type\\n    url\\n    __typename\\n  }\\n  url\\n  largeUrl\\n  blurUrl\\n  thumbUrl\\n  largerThumbUrl\\n  seoUrls\\n  __typename\\n}\\n\\nfragment CategorizationFragment on Categorizations {\\n  id\\n  __typename\\n}\\n\\nfragment DealOptionFragment on DealOption {\\n  id\\n  uuid\\n  title\\n  expiresAt\\n  optionStatus\\n  isSoldOut\\n  soldQuantityMessage\\n  discount\\n  discountExperiment\\n  specialMessageOption {\\n    message\\n    isNegative\\n    isPositive\\n    __typename\\n  }\\n  booking {\\n    agendas {\\n      id\\n      name\\n      __typename\\n    }\\n    bookingType\\n    componentFlow {\\n      key\\n      componentType\\n      invalidateStateOf\\n      title\\n      progressTitle\\n      loadingMessage\\n      noDataMessage\\n      modifiers\\n      __typename\\n    }\\n    __typename\\n  }\\n  buyUrl\\n  maximumPurchaseQuantity\\n  minimumPurchaseQuantity\\n  allowedQuantities\\n  actions {\\n    actionType\\n    status\\n    url\\n    __typename\\n  }\\n  consumerContractTerms {\\n    id\\n    uuid\\n    friendlyName\\n    children {\\n      id\\n      uuid\\n      friendlyName\\n      __typename\\n    }\\n    __typename\\n  }\\n  isStartingPrice\\n  strikeThroughPrice {\\n    ...FormattedPriceItemFragment\\n    __typename\\n  }\\n  price {\\n    ...FormattedPriceItemFragment\\n    __typename\\n  }\\n  unformattedPrice {\\n    amount\\n    currencyExponent\\n    currencyCode\\n    __typename\\n  }\\n  limitedSale {\\n    isLimitedSale\\n    endsAt\\n    limitedSaleOffer {\\n      relativeOfferLabel\\n      offerLabel\\n      rawOfferPrice\\n      offerPrice {\\n        ...FormattedPriceItemFragment\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  promotion {\\n    message\\n    endsAt\\n    promoEndTimeStamp\\n    event\\n    promocode\\n    adjustmentAmount\\n    finalDiscountedPrice\\n    formattedFinalPrice {\\n      ...FormattedPriceItemFragment\\n      __typename\\n    }\\n    __typename\\n  }\\n  traits {\\n    name\\n    value\\n    __typename\\n  }\\n  gallery {\\n    thumbnail {\\n      url\\n      __typename\\n    }\\n    largerThumbnail {\\n      url\\n      __typename\\n    }\\n    images {\\n      url\\n      __typename\\n    }\\n    __typename\\n  }\\n  warranties {\\n    uuid\\n    title\\n    helpContent\\n    actionLabel\\n    finePrint\\n    price {\\n      ...FormattedPriceItemFragment\\n      __typename\\n    }\\n    __typename\\n  }\\n  redemptionLocations {\\n    uuid\\n    city\\n    country\\n    state\\n    streetAddress1\\n    __typename\\n  }\\n  specificAttributes {\\n    description\\n    priceQualifier\\n    __typename\\n  }\\n  shippingCharge\\n  inventoryProductId\\n  includedFees {\\n    value\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment FormattedPriceItemFragment on FormattedPriceItem {\\n  alignTop\\n  value\\n  strikeThrough\\n  small\\n  bold\\n  fontSmall\\n  fontXSmall\\n  hideable\\n  __typename\\n}\\n\\nfragment TripadvisorReviewsFragment on PaginatedReviews {\\n  offset\\n  limit\\n  total\\n  rating\\n  items {\\n    id\\n    createdAt\\n    rating\\n    title\\n    text\\n    user {\\n      id\\n      profileId\\n      maskedName\\n      profileImageUrl\\n      stats {\\n        reviewCount\\n        helpfulCount\\n        imageCount\\n        ratingCount\\n        badges\\n        __typename\\n      }\\n      __typename\\n    }\\n    icons\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ShareLinkFragment on ShareLink {\\n  title\\n  url\\n  __typename\\n}\\n\\nfragment Deal_LocationDetails_RedemptionLocation on RedemptionLocation {\\n  id\\n  uuid\\n  address\\n  name\\n  websiteUrl\\n  directionsUrl\\n  distance\\n  phoneNumber\\n  openHours {\\n    dayOfWeek\\n    displayTime\\n    openNow\\n    startTime\\n    endTime\\n    __typename\\n  }\\n  amenities {\\n    iconUrl\\n    name\\n    available\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment TraitFragment on Trait {\\n  name\\n  pickerType\\n  position\\n  values {\\n    name\\n    shortName\\n    __typename\\n  }\\n  __typename\\n}"}]'
