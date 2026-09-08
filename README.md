# PY_fast_scanner_v3

Complete PWA scanner for Binance USDⓈ-M perpetual USDT contracts.

### Included
- Fast REST bootstrap + real-time Binance Futures WebSocket ticker.
- All / Rise / Fall / Long / Short / Impulse views.
- Rolling impulse detector with continuation/reversal confirmation and WAIT.
- Directional LONG/SHORT candidate score using price + OI + taker ratio + nearby order-book liquidity.
- Sound alerts for impulse, LONG and SHORT after one user tap.
- Candlestick chart overlay.
- Network-first service worker for HTML so new deployments are less likely to stay stale.
- Binance API requests are never cached by the service worker.

### Install
Upload **all files** to the same GitHub Pages folder. After deployment, open the site, hard-refresh once, and reinstall the PWA if an older installed copy remains.

### Important
This is a market-scanning/decision-support system, not a guarantee of profitable signals and not an order-execution bot. Backtest thresholds and scoring before risking real money.
